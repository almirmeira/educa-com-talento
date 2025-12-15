#\!/bin/bash
# ===================================
# SCRIPT DE BACKUP - EDUCA COM TALENTO
# ===================================

set -e

PROJETO_DIR="/opt/educa-com-talento"
BACKUP_DIR="${PROJETO_DIR}/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup_${DATE}.tar.gz"

# Criar diretório de backup se não existir
mkdir -p "$BACKUP_DIR"

echo "[$(date)] Iniciando backup..."

# Backup do código fonte e configurações
tar -czf "$BACKUP_FILE" \
    --exclude="node_modules" \
    --exclude=".next" \
    --exclude="backups" \
    --exclude="nginx/logs" \
    -C "$PROJETO_DIR" .

echo "[$(date)] Backup criado: $BACKUP_FILE"
echo "[$(date)] Tamanho: $(du -h "$BACKUP_FILE" | cut -f1)"

# Manter apenas os últimos 7 backups
echo "[$(date)] Removendo backups antigos..."
cd "$BACKUP_DIR"
ls -t backup_*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm -f

echo "[$(date)] Backup concluído\!"
