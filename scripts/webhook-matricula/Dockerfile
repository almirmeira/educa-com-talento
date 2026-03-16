# ===================================================
# WEBHOOK MATRÍCULA — EDUCA COM TALENTO
# Python 3.12 Slim, usuário não-root
# ===================================================

FROM python:3.12-slim

LABEL maintainer="contato@educacomtalento.com"
LABEL description="Webhook receptor de matrículas Hotmart/Kiwify"

WORKDIR /app

# Criar usuário não-root
RUN groupadd -r webhook && useradd -r -g webhook webhook

# Instalar dependências (camada separada para cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar aplicação
COPY app.py .

# Diretório de logs
RUN mkdir -p /app/logs && chown -R webhook:webhook /app

USER webhook

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/webhook/health')"

CMD ["gunicorn", \
     "--bind", "0.0.0.0:5000", \
     "--workers", "2", \
     "--threads", "4", \
     "--timeout", "30", \
     "--access-logfile", "/app/logs/access.log", \
     "--error-logfile", "/app/logs/error.log", \
     "--log-level", "info", \
     "app:app"]
