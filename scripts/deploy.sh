#\!/bin/bash
# ===================================
# SCRIPT DE DEPLOY - EDUCA COM TALENTO
# ===================================

set -e

PROJETO_DIR="/opt/educa-com-talento"
LOG_FILE="${PROJETO_DIR}/scripts/deploy.log"

log() {
    echo "[$(date "+%Y-%m-%d %H:%M:%S")] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "Iniciando deploy do Educa com Talento"
log "=========================================="

cd "$PROJETO_DIR"

# Parar containers existentes
log "Parando containers..."
docker compose down --remove-orphans 2>/dev/null || true

# Fazer backup antes do deploy
log "Criando backup..."
./scripts/backup.sh

# Build das imagens
log "Construindo imagens Docker..."
docker compose build --no-cache

# Iniciar containers
log "Iniciando containers..."
docker compose up -d

# Aguardar health checks
log "Aguardando serviços ficarem saudáveis..."
sleep 30

# Verificar status
log "Verificando status dos containers..."
docker compose ps

# Limpar imagens não utilizadas
log "Limpando imagens antigas..."
docker image prune -f

log "=========================================="
log "Deploy concluído com sucesso\!"
log "=========================================="

# Mostrar URL de acesso
echo ""
echo "🌐 Site disponível em: http://$(hostname -I | awk '{print $1}')"
