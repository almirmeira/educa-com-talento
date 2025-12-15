#!/bin/bash
# ===================================
# SCRIPT DE HARDENING - EDUCA COM TALENTO
# Segurança do servidor
# ===================================

set -e

echo "=========================================="
echo "Iniciando hardening do servidor"
echo "=========================================="

# 1. Atualizar sistema
echo "[1/10] Atualizando sistema..."
apt-get update -qq
apt-get upgrade -y -qq

# 2. Instalar ferramentas de segurança
echo "[2/10] Instalando ferramentas de segurança..."
apt-get install -y -qq ufw fail2ban unattended-upgrades

# 3. Configurar UFW (Firewall)
echo "[3/10] Configurando firewall UFW..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# 4. Configurar Fail2ban
echo "[4/10] Configurando Fail2ban..."
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
EOF
systemctl enable fail2ban
systemctl restart fail2ban

# 5. Configurar SSH seguro
echo "[5/10] Configurando SSH seguro..."
sed -i "s/#PermitRootLogin yes/PermitRootLogin prohibit-password/" /etc/ssh/sshd_config
sed -i "s/#PasswordAuthentication yes/PasswordAuthentication no/" /etc/ssh/sshd_config
sed -i "s/X11Forwarding yes/X11Forwarding no/" /etc/ssh/sshd_config
echo "MaxAuthTries 3" >> /etc/ssh/sshd_config
echo "ClientAliveInterval 300" >> /etc/ssh/sshd_config
echo "ClientAliveCountMax 2" >> /etc/ssh/sshd_config
systemctl restart sshd

# 6. Configurar atualizações automáticas de segurança
echo "[6/10] Configurando atualizações automáticas..."
cat > /etc/apt/apt.conf.d/50unattended-upgrades << EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}";
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};
Unattended-Upgrade::Package-Blacklist {
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

# 7. Configurar limites de sistema
echo "[7/10] Configurando limites do sistema..."
cat >> /etc/security/limits.conf << EOF
* soft nofile 65535
* hard nofile 65535
EOF

# 8. Desabilitar serviços desnecessários
echo "[8/10] Desabilitando serviços desnecessários..."
systemctl disable cups 2>/dev/null || true
systemctl disable bluetooth 2>/dev/null || true
systemctl disable avahi-daemon 2>/dev/null || true

# 9. Configurar sysctl para segurança de rede
echo "[9/10] Configurando parâmetros de kernel..."
cat > /etc/sysctl.d/99-security.conf << EOF
# Proteção contra IP Spoofing
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignorar ICMP broadcasts
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Desabilitar source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Proteção SYN flood
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 2

# Desabilitar redirecionamentos ICMP
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# Log pacotes marcianos
net.ipv4.conf.all.log_martians = 1

# Desabilitar IPv6 se não usado
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
EOF
sysctl -p /etc/sysctl.d/99-security.conf

# 10. Permissões de arquivos importantes
echo "[10/10] Ajustando permissões de arquivos..."
chmod 700 /root
chmod 600 /etc/ssh/sshd_config

echo "=========================================="
echo "Hardening concluído com sucesso!"
echo "=========================================="
echo ""
echo "Resumo das configurações:"
echo "- UFW firewall: ATIVO (portas 22, 80, 443)"
echo "- Fail2ban: ATIVO (proteção contra brute-force)"
echo "- SSH: Apenas chave pública, root com chave"
echo "- Atualizações automáticas: ATIVAS"
echo "- Parâmetros de kernel: OTIMIZADOS"
