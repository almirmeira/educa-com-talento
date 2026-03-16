# Configuração da API REST do Moodle

> Passo a passo para habilitar o Web Service REST e gerar o token de acesso para o sistema de matrículas automáticas.

---

## 1. Habilitar Web Services

1. Acesse: **Administração do Site** → **Recursos Avançados**
2. Marque: ✓ **Habilitar serviços web**
3. Clique em **Salvar alterações**

## 2. Ativar Protocolo REST

1. Acesse: **Admin** → **Plugins** → **Serviços Web** → **Gerenciar Protocolos**
2. Clique no ícone de olho ao lado de **REST Protocol** para **Habilitar**

## 3. Criar Usuário de Serviço

1. **Admin** → **Usuários** → **Contas** → **Adicionar novo usuário**

   | Campo | Valor |
   |-------|-------|
   | Nome | `API` |
   | Sobrenome | `Matrículas` |
   | Nome de usuário | `api_matriculas` |
   | E-mail | `api@educacomtalento.com` |
   | Autenticação | Manual |

2. Clique em **Criar usuário**

## 4. Criar Papel (Role) Dedicado

1. **Admin** → **Usuários** → **Permissões** → **Definir papéis** → **Adicionar novo papel**

   | Campo | Valor |
   |-------|-------|
   | Nome | `API Matrículas` |
   | Nome curto | `api_matriculas` |
   | Contexto | Sistema |

2. Habilite as capacidades abaixo como **Permitir**:

   | Capacidade | Motivo |
   |------------|--------|
   | `moodle/user:create` | Criar novos alunos |
   | `moodle/user:viewdetails` | Buscar usuários |
   | `moodle/user:viewalldetails` | Buscar por e-mail |
   | `enrol/manual:enrol` | Matricular em cursos |
   | `enrol/manual:unenrol` | Cancelar matrículas |
   | `moodle/course:view` | Ver cursos |

3. Clique em **Criar este papel**

## 5. Atribuir Papel ao Usuário de Serviço

1. **Admin** → **Usuários** → **Permissões** → **Atribuir papéis do sistema**
2. Selecione o papel `API Matrículas`
3. Adicione o usuário `api_matriculas`
4. Clique em **Atribuir papéis selecionados**

## 6. Criar External Service

1. **Admin** → **Plugins** → **Serviços Web** → **Serviços Externos** → **Adicionar**

   | Campo | Valor |
   |-------|-------|
   | Nome | `Matrícula Automática` |
   | Nome curto | `matricula_auto` |
   | Habilitado | ✓ Sim |
   | Somente usuários autorizados | ✓ Sim |

2. Clique em **Adicionar serviço**

## 7. Adicionar Funções ao Serviço

1. Na lista de serviços, clique em **Funções** ao lado de "Matrícula Automática"
2. Adicione as funções:

   | Função |
   |--------|
   | `core_user_get_users` |
   | `core_user_create_users` |
   | `enrol_manual_enrol_users` |
   | `enrol_manual_unenrol_users` |
   | `core_course_get_courses` |

## 8. Autorizar Usuário no Serviço

1. Na lista de serviços, clique em **Usuários autorizados**
2. Adicione o usuário `api_matriculas`

## 9. Gerar Token de Acesso

1. **Admin** → **Plugins** → **Serviços Web** → **Gerenciar tokens** → **Criar token**

   | Campo | Valor |
   |-------|-------|
   | Usuário | `api_matriculas` |
   | Serviço | `Matrícula Automática` |
   | Validade | Sem validade |

2. Copie o token gerado → coloque em `MOODLE_TOKEN=` no arquivo `.env`

## 10. Testar a API

```bash
# Substituir TOKEN pelo valor gerado no passo 9

# Testar busca de usuário
curl "https://cursos.educacomtalento.com/webservice/rest/server.php?\
wstoken=TOKEN\
&wsfunction=core_user_get_users\
&criteria[0][key]=email\
&criteria[0][value]=teste@gmail.com\
&moodlewsrestformat=json"

# Testar listagem de cursos
curl "https://cursos.educacomtalento.com/webservice/rest/server.php?\
wstoken=TOKEN\
&wsfunction=core_course_get_courses\
&options[ids][0]=2\
&moodlewsrestformat=json"
```

**Resposta esperada:** JSON com dados do curso (não deve conter `"exception"`).

## 11. Configurar Webhook no .env

```bash
# No servidor DO
nano /opt/educa-com-talento/webhook-matricula/.env

# Preencher:
MOODLE_URL=https://cursos.educacomtalento.com
MOODLE_TOKEN=<token gerado no passo 9>
MOODLE_ROLE_ID=5
```

## 12. Verificar IDs dos Cursos Moodle

```bash
# Via CLI no container
docker exec educa-moodle php /var/www/html/admin/cli/cfg.php --list | grep -v password

# Via REST API
curl "https://cursos.educacomtalento.com/webservice/rest/server.php?\
wstoken=TOKEN\
&wsfunction=core_course_get_courses\
&moodlewsrestformat=json"
```

Os IDs dos cursos devem ser usados no mapeamento `.env`:
```
HOTMART_MAP_<ID_HOTMART>=<ID_CURSO_MOODLE>
KIWIFY_MAP_<ID_KIWIFY>=<ID_CURSO_MOODLE>
```
