# Guia de Migracao para Hospedagem Comercial

## Educa com Talento - Website

Este documento descreve o processo completo de migracao do ambiente de staging (Proxmox) para uma hospedagem comercial.

---

## Indice

1. [Requisitos do Servidor](#requisitos-do-servidor)
2. [Provedores Recomendados](#provedores-recomendados)
3. [Preparacao Pre-Migracao](#preparacao-pre-migracao)
4. [Processo de Migracao](#processo-de-migracao)
5. [Configuracao de DNS](#configuracao-de-dns)
6. [Configuracao de SSL/TLS](#configuracao-de-ssltls)
7. [Checklist Pos-Migracao](#checklist-pos-migracao)

---

## 1. Requisitos do Servidor

### Minimos
- **CPU**: 1 vCPU
- **RAM**: 1 GB
- **Disco**: 20 GB SSD
- **SO**: Ubuntu 22.04 LTS

### Recomendados
- **CPU**: 2 vCPU
- **RAM**: 2 GB
- **Disco**: 40 GB SSD
- **SO**: Ubuntu 22.04 LTS
- **Localizacao**: Sao Paulo (latencia)

### Software Necessario
- Docker 24+
- Docker Compose 2+
- Git
- UFW (firewall)

---

## 2. Provedores Recomendados

### Brasil (Menor latencia)
| Provedor | Plano | Preco/mes | Observacoes |
|----------|-------|-----------|-------------|
| DigitalOcean | Basic 2GB | ~R$ 60 | Datacenter em SP |
| Vultr | Cloud 2GB | ~R$ 55 | Datacenter em SP |
| Hostinger VPS | KVM 2 | ~R$ 45 | Bom custo-beneficio |
| Locaweb | VPS Linux | ~R$ 70 | Suporte em portugues |

### Internacional (Custo x Beneficio)
| Provedor | Plano | Preco/mes | Observacoes |
|----------|-------|-----------|-------------|
| Hetzner | CX21 | ~EUR 5 | Excelente custo-beneficio |
| Linode | Nanode 2GB | $12 | Estavel |
| AWS Lightsail | 2GB | $10 | Integracao AWS |

---

## 3. Preparacao Pre-Migracao

### 3.1 Backup Completo
```bash
# No servidor atual
cd /opt/educa-com-talento
./scripts/backup.sh
```

### 3.2 Exportar Configuracoes
```bash
# Copiar backup para local seguro
scp root@192.168.1.46:/opt/educa-com-talento/backups/backup_*.tar.gz ./
```

### 3.3 Documentar Configuracoes Atuais
- IP atual: 192.168.1.46
- Dominio planejado: educacomtalento.com.br
- Subdominio Moodle: cursos.educacomtalento.com.br

---

## 4. Processo de Migracao

### 4.1 Provisionar Novo Servidor
```bash
# Apos criar VPS no provedor escolhido
ssh root@<IP_NOVO_SERVIDOR>
```

### 4.2 Configuracao Inicial
```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin

# Criar estrutura
mkdir -p /opt/educa-com-talento
```

### 4.3 Transferir Projeto
```bash
# Do seu computador local
scp backup_*.tar.gz root@<IP_NOVO_SERVIDOR>:/opt/educa-com-talento/

# No novo servidor
cd /opt/educa-com-talento
tar -xzf backup_*.tar.gz
```

### 4.4 Executar Hardening
```bash
./scripts/hardening.sh
```

### 4.5 Deploy
```bash
./scripts/deploy.sh
```

---

## 5. Configuracao de DNS

### 5.1 Registros Necessarios
```
# Registro A principal
educacomtalento.com.br    A    <IP_SERVIDOR>

# Registro A para www
www.educacomtalento.com.br    A    <IP_SERVIDOR>

# Registro A para Moodle (futuro)
cursos.educacomtalento.com.br    A    <IP_SERVIDOR>

# Registro MX para email (opcional)
educacomtalento.com.br    MX    10 mail.educacomtalento.com.br

# Registro TXT para SPF (email)
educacomtalento.com.br    TXT    "v=spf1 mx ~all"
```

### 5.2 Propagacao
- Tempo medio: 24-48 horas
- Verificar: https://dnschecker.org

---

## 6. Configuracao de SSL/TLS

### 6.1 Instalar Certbot
```bash
apt install -y certbot python3-certbot-nginx
```

### 6.2 Obter Certificado Lets Encrypt
```bash
# Parar Nginx temporariamente
docker compose stop nginx

# Obter certificado
certbot certonly --standalone -d educacomtalento.com.br -d www.educacomtalento.com.br

# Copiar certificados
cp /etc/letsencrypt/live/educacomtalento.com.br/fullchain.pem /opt/educa-com-talento/ssl/
cp /etc/letsencrypt/live/educacomtalento.com.br/privkey.pem /opt/educa-com-talento/ssl/
```

### 6.3 Habilitar HTTPS no Nginx
Editar `/opt/educa-com-talento/nginx/conf.d/default.conf`:
- Descomentar bloco HTTPS
- Comentar ou redirecionar bloco HTTP

### 6.4 Renovacao Automatica
```bash
# Adicionar ao crontab
crontab -e
# Adicionar linha:
0 3 * * * certbot renew --quiet --post-hook 'docker compose -f /opt/educa-com-talento/docker-compose.yml restart nginx'
```

---

## 7. Checklist Pos-Migracao

### Verificacoes Obrigatorias
- [ ] Site acessivel via HTTP
- [ ] Site acessivel via HTTPS (apos SSL)
- [ ] Redirecionamento HTTP -> HTTPS funcionando
- [ ] Todas as paginas carregando corretamente
- [ ] Formulario de contato funcionando
- [ ] Imagens e assets carregando
- [ ] Tempo de resposta < 3 segundos
- [ ] Mobile responsivo OK

### Verificacoes de Seguranca
- [ ] Firewall UFW ativo
- [ ] Fail2ban monitorando
- [ ] SSL com nota A+ (https://ssllabs.com)
- [ ] Headers de seguranca corretos

### Monitoramento
- [ ] Configurar uptime monitoring (UptimeRobot, etc)
- [ ] Configurar alertas de erro
- [ ] Backup automatico configurado

---

## Suporte

Em caso de problemas durante a migracao:
- Email: contato@educacomtalento.com.br
- Documentacao Docker: https://docs.docker.com

---

*Documento gerado automaticamente*
