#!/usr/bin/env python3
# ===================================================
# MOODLE SETUP API — EDUCA COM TALENTO
# Configura Web Services REST e gera token via CLI
# Uso: python3 moodle-setup-api.py
# Requer: docker exec ao container educa-moodle
# ===================================================

import subprocess
import sys
import json

CONTAINER = "educa-moodle"
PHP_BIN   = "php"
MOODLE_DIR = "/var/www/html"


def run_moodle_php(script: str) -> str:
    """Executa um script PHP dentro do container Moodle e retorna stdout."""
    cmd = ["docker", "exec", CONTAINER, PHP_BIN, "-r", script]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[ERRO] PHP error:\n{result.stderr}", file=sys.stderr)
        sys.exit(1)
    return result.stdout.strip()


def run_moodle_cli(script_path: str, *args) -> str:
    """Executa um script CLI do Moodle dentro do container."""
    cmd = ["docker", "exec", CONTAINER, PHP_BIN, script_path, *args]
    result = subprocess.run(cmd, capture_output=True, text=True)
    output = result.stdout + result.stderr
    return output.strip()


def enable_webservices():
    """Habilita Web Services e protocolo REST no Moodle."""
    print("[1/5] Habilitando Web Services REST...")

    script = f"""
define('CLI_SCRIPT', true);
require('{MOODLE_DIR}/config.php');
set_config('enablewebservices', 1);
set_config('webserviceprotocols', 'rest');
echo 'OK';
"""
    result = run_moodle_php(script)
    print(f"      Web Services: {result}")

    # Purgar cache
    run_moodle_cli(f"{MOODLE_DIR}/admin/cli/purge_caches.php")
    print("      Cache purgado.")


def create_service_user():
    """Cria o usuário de serviço api_matriculas (se não existir)."""
    print("[2/5] Verificando usuário de serviço...")

    script = f"""
define('CLI_SCRIPT', true);
require('{MOODLE_DIR}/config.php');
$user = $DB->get_record('user', array('username' => 'api_matriculas'));
if ($user) {{
    echo 'EXISTS:' . $user->id;
}} else {{
    $user = new stdClass();
    $user->username   = 'api_matriculas';
    $user->password   = hash_internal_user_password('ApiMatriculas!2026');
    $user->firstname  = 'API';
    $user->lastname   = 'Matriculas';
    $user->email      = 'api@educacomtalento.com';
    $user->confirmed  = 1;
    $user->mnethostid = $CFG->mnet_localhost_id;
    $user->lang       = 'pt_br';
    $user->auth       = 'manual';
    $uid = $DB->insert_record('user', $user);
    echo 'CREATED:' . $uid;
}}
"""
    result = run_moodle_php(script)
    print(f"      Usuário: {result}")
    return result.split(":")[1] if ":" in result else None


def create_role_and_assign():
    """Cria papel API Matrículas e atribui ao usuário de serviço."""
    print("[3/5] Configurando papel (role) API Matrículas...")

    script = f"""
define('CLI_SCRIPT', true);
require('{MOODLE_DIR}/config.php');

// Verificar se o papel já existe
$role = $DB->get_record('role', array('shortname' => 'api_matriculas'));
if (!$role) {{
    $roleid = create_role('API Matriculas', 'api_matriculas', 'Papel para integracao de matriculas automaticas', 'student');
    echo 'ROLE_CREATED:' . $roleid;
}} else {{
    $roleid = $role->id;
    echo 'ROLE_EXISTS:' . $roleid;
}}

// Capacidades necessárias
$context = context_system::instance();
$capabilities = array(
    'moodle/user:create',
    'moodle/user:viewdetails',
    'moodle/user:viewalldetails',
    'enrol/manual:enrol',
    'enrol/manual:unenrol',
    'moodle/course:view',
    'webservice/rest:use',
);
foreach ($capabilities as $cap) {{
    assign_capability($cap, CAP_ALLOW, $roleid, $context->id, true);
}}

// Atribuir papel ao usuário api_matriculas
$user = $DB->get_record('user', array('username' => 'api_matriculas'));
if ($user) {{
    role_assign($roleid, $user->id, $context->id);
    echo ' USER_ASSIGNED';
}}
"""
    result = run_moodle_php(script)
    print(f"      {result}")


def create_external_service():
    """Cria o External Service e adiciona as funções necessárias."""
    print("[4/5] Criando External Service e adicionando funções...")

    functions = [
        "core_user_get_users",
        "core_user_create_users",
        "enrol_manual_enrol_users",
        "enrol_manual_unenrol_users",
        "core_course_get_courses",
    ]

    func_inserts = ""
    for func in functions:
        func_inserts += f"""
    $func = $DB->get_record('external_functions', array('name' => '{func}'));
    if ($func) {{
        $sf = new stdClass();
        $sf->externalserviceid = $serviceid;
        $sf->functionname = '{func}';
        if (!$DB->record_exists('external_services_functions', (array)$sf)) {{
            $DB->insert_record('external_services_functions', $sf);
            echo 'FUNC_ADDED:{func} ';
        }} else {{
            echo 'FUNC_EXISTS:{func} ';
        }}
    }}
""".replace("{func}", func)

    script = f"""
define('CLI_SCRIPT', true);
require('{MOODLE_DIR}/config.php');

// Criar ou obter External Service
$service = $DB->get_record('external_services', array('shortname' => 'matricula_auto'));
if (!$service) {{
    $svc = new stdClass();
    $svc->name        = 'Matricula Automatica';
    $svc->shortname   = 'matricula_auto';
    $svc->enabled     = 1;
    $svc->restrictedusers = 1;
    $svc->downloadfiles  = 0;
    $svc->uploadfiles    = 0;
    $svc->timecreated = time();
    $svc->timemodified = time();
    $serviceid = $DB->insert_record('external_services', $svc);
    echo 'SERVICE_CREATED:' . $serviceid . ' ';
}} else {{
    $serviceid = $service->id;
    echo 'SERVICE_EXISTS:' . $serviceid . ' ';
}}

{func_inserts}

// Autorizar usuário api_matriculas no serviço
$apiuser = $DB->get_record('user', array('username' => 'api_matriculas'));
if ($apiuser) {{
    $exists = $DB->record_exists('external_services_users', array('externalserviceid' => $serviceid, 'userid' => $apiuser->id));
    if (!$exists) {{
        $su = new stdClass();
        $su->externalserviceid = $serviceid;
        $su->userid = $apiuser->id;
        $su->timecreated = time();
        $DB->insert_record('external_services_users', $su);
        echo 'USER_AUTHORIZED';
    }} else {{
        echo 'USER_ALREADY_AUTHORIZED';
    }}
}}
"""
    result = run_moodle_php(script)
    print(f"      {result}")


def generate_token():
    """Gera o token de acesso para o External Service."""
    print("[5/5] Gerando token de acesso...")

    script = f"""
define('CLI_SCRIPT', true);
require('{MOODLE_DIR}/config.php');

$apiuser = $DB->get_record('user', array('username' => 'api_matriculas'));
$service = $DB->get_record('external_services', array('shortname' => 'matricula_auto'));

if (!$apiuser || !$service) {{
    echo 'ERROR: usuario ou servico nao encontrado';
    exit(1);
}}

// Verificar se já existe token
$existing = $DB->get_record('external_tokens', array(
    'userid' => $apiuser->id,
    'externalserviceid' => $service->id,
));

if ($existing) {{
    echo 'TOKEN_EXISTS:' . $existing->token;
}} else {{
    $token = new stdClass();
    $token->token             = md5(uniqid(rand(), true));
    $token->userid            = $apiuser->id;
    $token->tokentype         = EXTERNAL_TOKEN_PERMANENT;
    $token->contextid         = context_system::instance()->id;
    $token->creatorid         = $apiuser->id;
    $token->timecreated       = time();
    $token->validuntil        = 0;
    $token->externalserviceid = $service->id;
    $DB->insert_record('external_tokens', $token);
    echo 'TOKEN_CREATED:' . $token->token;
}}
"""
    result = run_moodle_php(script)
    if ":" in result:
        status, token = result.split(":", 1)
        return token
    print(f"      [AVISO] {result}")
    return None


def main():
    print("=" * 60)
    print("  SETUP API REST MOODLE — EDUCA COM TALENTO")
    print("=" * 60)
    print()

    enable_webservices()
    create_service_user()
    create_role_and_assign()
    create_external_service()
    token = generate_token()

    print()
    print("=" * 60)
    print("  CONFIGURAÇÃO CONCLUÍDA!")
    print("=" * 60)
    if token:
        print(f"""
Token gerado com sucesso. Adicione ao arquivo .env:

  MOODLE_TOKEN={token}

Para testar:
  curl "https://cursos.educacomtalento.com/webservice/rest/server.php?\\
  wstoken={token}&wsfunction=core_course_get_courses&moodlewsrestformat=json"
""")
    else:
        print("\n[ATENÇÃO] Token não gerado — verifique os erros acima.")
    print("=" * 60)


if __name__ == "__main__":
    main()
