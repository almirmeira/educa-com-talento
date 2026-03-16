#!/usr/bin/env python3
# ===================================================
# WEBHOOK DE MATRÍCULA AUTOMÁTICA — EDUCA COM TALENTO
# Receptor Flask para Hotmart e Kiwify
# ===================================================

import os
import hmac
import hashlib
import logging
import json
import smtplib
import secrets
import string
import requests
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, abort
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# -------------------------------------------------------
# CONFIGURAÇÃO DE LOGGING
# -------------------------------------------------------
log_dir = os.environ.get("LOG_DIR", "/app/logs")
os.makedirs(log_dir, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(os.path.join(log_dir, "webhook.log")),
        logging.StreamHandler(),
    ],
)
log = logging.getLogger(__name__)

# -------------------------------------------------------
# VARIÁVEIS DE AMBIENTE
# -------------------------------------------------------
MOODLE_URL        = os.environ["MOODLE_URL"]
MOODLE_TOKEN      = os.environ["MOODLE_TOKEN"]
HOTMART_SECRET    = os.environ.get("HOTMART_HOTTOK", "")
KIWIFY_SECRET     = os.environ.get("KIWIFY_SECRET", "")
SMTP_HOST         = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT         = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER         = os.environ.get("SMTP_USER", "")
SMTP_PASS         = os.environ.get("SMTP_PASS", "")
EMAIL_FROM        = os.environ.get("EMAIL_FROM", "noreply@educacomtalento.com")
ENROLLMENT_ROLEID = int(os.environ.get("MOODLE_ROLE_ID", "5"))  # 5 = Student


def _load_product_map(prefix: str) -> dict:
    """Carrega mapeamento produto_id → course_id das variáveis de ambiente."""
    mapping = {}
    for key, val in os.environ.items():
        if key.startswith(prefix):
            product_id = key[len(prefix):]
            mapping[product_id] = int(val)
    return mapping


HOTMART_PRODUCT_MAP = _load_product_map("HOTMART_MAP_")
KIWIFY_PRODUCT_MAP  = _load_product_map("KIWIFY_MAP_")

# -------------------------------------------------------
# MOODLE REST API
# -------------------------------------------------------
MOODLE_API_URL = f"{MOODLE_URL}/webservice/rest/server.php"


def moodle_call(function: str, params: dict):
    """Chama a Moodle REST API e retorna o resultado ou lança exceção."""
    payload = {
        "wstoken": MOODLE_TOKEN,
        "wsfunction": function,
        "moodlewsrestformat": "json",
        **params,
    }
    resp = requests.post(MOODLE_API_URL, data=payload, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, dict) and "exception" in data:
        raise RuntimeError(f"Moodle API error [{function}]: {data.get('message', data)}")
    return data


def get_or_create_user(email: str, firstname: str, lastname: str) -> int:
    """Retorna o ID do usuário Moodle, criando-o se necessário."""
    result = moodle_call("core_user_get_users", {
        "criteria[0][key]": "email",
        "criteria[0][value]": email,
    })
    users = result.get("users", [])
    if users:
        uid = users[0]["id"]
        log.info(f"Usuário existente: id={uid} email={email}")
        return uid

    # Gerar username único a partir do e-mail + timestamp
    base_username = email.split("@")[0].lower().replace(".", "_")
    ts_suffix = datetime.utcnow().strftime("%m%d%H%M")
    safe_username = f"{base_username}_{ts_suffix}"

    # Senha temporária forte — aluno usará "Esqueci minha senha" no primeiro acesso
    alphabet = string.ascii_letters + string.digits + "!@#"
    temp_password = "".join(secrets.choice(alphabet) for _ in range(16))

    new_user = moodle_call("core_user_create_users", {
        "users[0][username]":  safe_username,
        "users[0][password]":  temp_password,
        "users[0][firstname]": firstname,
        "users[0][lastname]":  lastname,
        "users[0][email]":     email,
        "users[0][lang]":      "pt_br",
        "users[0][auth]":      "manual",
    })
    uid = new_user[0]["id"]
    log.info(f"Usuário criado: id={uid} username={safe_username} email={email}")
    return uid


def enroll_user(user_id: int, course_id: int) -> None:
    """Matricula o usuário no curso Moodle."""
    moodle_call("enrol_manual_enrol_users", {
        "enrolments[0][roleid]":   ENROLLMENT_ROLEID,
        "enrolments[0][userid]":   user_id,
        "enrolments[0][courseid]": course_id,
    })
    log.info(f"Matrícula realizada: user_id={user_id} course_id={course_id}")


def unenroll_user(user_id: int, course_id: int) -> None:
    """Remove a matrícula do usuário (reembolso)."""
    moodle_call("enrol_manual_unenrol_users", {
        "enrolments[0][userid]":   user_id,
        "enrolments[0][courseid]": course_id,
    })
    log.info(f"Matrícula removida: user_id={user_id} course_id={course_id}")


def get_course_name(course_id: int) -> str:
    """Obtém o nome do curso pelo ID."""
    try:
        result = moodle_call("core_course_get_courses", {
            "options[ids][0]": course_id,
        })
        if result:
            return result[0].get("fullname", f"Curso #{course_id}")
    except Exception:
        pass
    return f"Curso #{course_id}"


# -------------------------------------------------------
# E-MAIL DE BOAS-VINDAS
# -------------------------------------------------------
WELCOME_TEMPLATE = """\
Olá, {firstname}!

Parabéns pela sua matrícula em "{course_name}" na Educa com Talento!

Acesse sua área do aluno em:
{moodle_url}

Como acessar pela primeira vez:
  1. Acesse o link acima
  2. Clique em "Esqueci minha senha"
  3. Informe o e-mail: {email}
  4. Siga as instruções enviadas para criar sua senha

Qualquer dúvida, responda este e-mail ou acesse nosso site:
https://educacomtalento.com

Bons estudos!
Equipe Educa com Talento
"""


def send_welcome_email(email: str, firstname: str, course_name: str) -> None:
    if not SMTP_USER or not SMTP_PASS:
        log.warning("SMTP não configurado — e-mail de boas-vindas ignorado.")
        return
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Bem-vindo(a) ao curso: {course_name} 🎓"
        msg["From"]    = EMAIL_FROM
        msg["To"]      = email
        body = WELCOME_TEMPLATE.format(
            firstname=firstname,
            course_name=course_name,
            email=email,
            moodle_url=MOODLE_URL,
        )
        msg.attach(MIMEText(body, "plain", "utf-8"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(EMAIL_FROM, email, msg.as_string())
        log.info(f"E-mail de boas-vindas enviado para {email}")
    except Exception as exc:
        log.error(f"Falha ao enviar e-mail para {email}: {exc}")


# -------------------------------------------------------
# LÓGICA CENTRAL DE MATRÍCULA / CANCELAMENTO
# -------------------------------------------------------
def process_purchase(email: str, firstname: str, lastname: str,
                     product_id: str, product_map: dict, source: str):
    """Processa compra aprovada: cria usuário e matricula."""
    course_id = product_map.get(product_id)
    if not course_id:
        log.warning(f"[{source}] produto_id={product_id} não mapeado — ignorando.")
        return f"produto {product_id} não mapeado", 200

    try:
        user_id = get_or_create_user(email, firstname, lastname)
        enroll_user(user_id, course_id)
        course_name = get_course_name(course_id)
        send_welcome_email(email, firstname, course_name)
        log.info(f"[{source}] COMPRA APROVADA | email={email} | produto={product_id} | curso={course_id}")
        return "matrícula realizada", 200
    except Exception as exc:
        log.error(f"[{source}] Erro ao processar compra de {email}: {exc}")
        return f"erro interno: {exc}", 500


def process_refund(email: str, product_id: str, product_map: dict, source: str):
    """Processa reembolso: remove matrícula."""
    course_id = product_map.get(product_id)
    if not course_id:
        log.warning(f"[{source}] reembolso para produto não mapeado: {product_id}")
        return "produto não mapeado", 200

    try:
        result = moodle_call("core_user_get_users", {
            "criteria[0][key]": "email",
            "criteria[0][value]": email,
        })
        users = result.get("users", [])
        if not users:
            log.warning(f"[{source}] usuário não encontrado para reembolso: {email}")
            return "usuário não encontrado", 200

        unenroll_user(users[0]["id"], course_id)
        log.info(f"[{source}] REEMBOLSO | email={email} | produto={product_id} | curso={course_id}")
        return "matrícula removida", 200
    except Exception as exc:
        log.error(f"[{source}] Erro ao processar reembolso de {email}: {exc}")
        return f"erro interno: {exc}", 500


# -------------------------------------------------------
# WEBHOOK HOTMART
# -------------------------------------------------------
def verify_hotmart(req) -> bool:
    """Hotmart: verifica header X-Hotmart-Webhook-Token contra HOTTOK."""
    token = req.headers.get("X-Hotmart-Webhook-Token", "")
    return hmac.compare_digest(token, HOTMART_SECRET)


@app.route("/webhook/hotmart", methods=["POST"])
def hotmart_webhook():
    if not verify_hotmart(request):
        log.warning("Hotmart: assinatura inválida")
        abort(401)

    data = request.get_json(force=True, silent=True)
    if not data:
        abort(400)

    log.info(f"Hotmart recebido: {json.dumps(data, ensure_ascii=False)[:300]}")

    event   = data.get("event", "")
    buyer   = data.get("data", {}).get("buyer", {})
    product = data.get("data", {}).get("product", {})

    email      = buyer.get("email", "")
    name       = buyer.get("name", "Aluno")
    parts      = name.split(" ", 1)
    firstname  = parts[0]
    lastname   = parts[1] if len(parts) > 1 else "."
    product_id = str(product.get("id", ""))

    if event in ("PURCHASE_APPROVED", "PURCHASE_COMPLETE"):
        msg, code = process_purchase(email, firstname, lastname,
                                     product_id, HOTMART_PRODUCT_MAP, "HOTMART")
    elif event in ("PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_CANCELED"):
        msg, code = process_refund(email, product_id, HOTMART_PRODUCT_MAP, "HOTMART")
    else:
        log.info(f"Hotmart evento ignorado: {event}")
        msg, code = f"evento {event} ignorado", 200

    return jsonify({"status": msg}), code


# -------------------------------------------------------
# WEBHOOK KIWIFY
# -------------------------------------------------------
def verify_kiwify(req) -> bool:
    """Kiwify: verifica HMAC-SHA1 do body com o secret configurado."""
    sig_header = req.headers.get("X-Kiwify-Signature", "")
    body = req.get_data()
    expected = hmac.new(
        KIWIFY_SECRET.encode("utf-8"),
        body,
        hashlib.sha1,
    ).hexdigest()
    return hmac.compare_digest(sig_header, expected)


@app.route("/webhook/kiwify", methods=["POST"])
def kiwify_webhook():
    if not verify_kiwify(request):
        log.warning("Kiwify: assinatura inválida")
        abort(401)

    data = request.get_json(force=True, silent=True)
    if not data:
        abort(400)

    log.info(f"Kiwify recebido: {json.dumps(data, ensure_ascii=False)[:300]}")

    order_status = data.get("order_status", "")
    customer     = data.get("Customer", {})
    product      = data.get("Product", {})

    email      = customer.get("email", "")
    firstname  = customer.get("first_name", "Aluno")
    lastname   = customer.get("last_name", ".")
    product_id = str(product.get("id", ""))

    if order_status == "paid":
        msg, code = process_purchase(email, firstname, lastname,
                                     product_id, KIWIFY_PRODUCT_MAP, "KIWIFY")
    elif order_status in ("refunded", "chargedback"):
        msg, code = process_refund(email, product_id, KIWIFY_PRODUCT_MAP, "KIWIFY")
    else:
        log.info(f"Kiwify status ignorado: {order_status}")
        msg, code = f"status {order_status} ignorado", 200

    return jsonify({"status": msg}), code


# -------------------------------------------------------
# HEALTH CHECK
# -------------------------------------------------------
@app.route("/webhook/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "webhook-matricula"}), 200


# -------------------------------------------------------
# ENTRY POINT
# -------------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("WEBHOOK_PORT", "5000"))
    app.run(host="0.0.0.0", port=port)
