# Estratégia de Matrículas Automáticas — Educa com Talento

> Versão: 1.0 | Março/2026

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura](#2-arquitetura)
3. [Fluxo de Compra Aprovada](#3-fluxo-de-compra-aprovada)
4. [Fluxo de Reembolso](#4-fluxo-de-reembolso)
5. [Segurança](#5-segurança)
6. [Mapeamento Produto × Curso](#6-mapeamento-produto--curso)
7. [Monitoramento e Logs](#7-monitoramento-e-logs)
8. [Plataformas Suportadas](#8-plataformas-suportadas)
9. [Contingência](#9-contingência)
10. [Roadmap](#10-roadmap)

---

## 1. Visão Geral

O sistema elimina a intervenção manual entre o pagamento do aluno em plataformas de venda (Hotmart, Kiwify) e o acesso ao Moodle.

**Resultado:** em até 60 segundos após a confirmação do pagamento, o aluno já possui conta no Moodle, matrícula no curso correto e e-mail de boas-vindas na caixa de entrada.

| Benefício | Impacto |
|-----------|---------|
| Matrícula imediata (< 60s) | Experiência de compra superior |
| Zero intervenção manual | Escalabilidade ilimitada |
| Reembolso automático | Conformidade com as plataformas |
| Log completo de transações | Auditoria e suporte ao aluno |
| Multi-plataforma | Flexibilidade comercial |

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                       INTERNET                           │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
    ┌──────────▼──────────┐   ┌───────────▼──────────────┐
    │       HOTMART        │   │          KIWIFY           │
    │  POST /webhook/      │   │  POST /webhook/           │
    │        hotmart       │   │        kiwify             │
    └──────────┬───────────┘   └───────────┬──────────────┘
               │                           │
               └─────────────┬─────────────┘
                             │  HTTPS POST + assinatura
                             ▼
        ┌────────────────────────────────────────┐
        │          NGINX (reverse proxy)          │
        │     cursos.educacomtalento.com          │
        │     /webhook/* → 127.0.0.1:5000        │
        └────────────────────┬───────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │       FLASK WEBHOOK SERVICE             │
        │   Container: webhook-matricula          │
        │                                        │
        │   1. Verificar assinatura              │
        │   2. Parsear payload JSON              │
        │   3. Mapear produto → curso            │
        │   4. Chamar Moodle REST API            │
        │   5. Enviar e-mail de boas-vindas      │
        └────────────────────┬───────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │      MOODLE REST API         │
              │   127.0.0.1:8080             │
              │                             │
              │  core_user_get_users        │
              │  core_user_create_users     │
              │  enrol_manual_enrol_users   │
              │  enrol_manual_unenrol_users │
              └──────────────┬──────────────┘
                             │
              ┌──────────────▼──────────────┐
              │        SMTP (e-mail)         │
              │   Boas-vindas ao aluno       │
              └─────────────────────────────┘
```

---

## 3. Fluxo de Compra Aprovada

```
Aluno paga o curso
        │
        ▼
  Hotmart/Kiwify confirma pagamento
        │
        │ POST webhook (JSON + assinatura)
        ▼
  Flask verifica assinatura
  ├── INVÁLIDA → HTTP 401 + log de alerta
  └── VÁLIDA → continua
        │
        ▼
  Parsear payload:
  email, firstname, lastname, product_id, evento
        │
        ▼
  Verificar evento (PURCHASE_APPROVED / paid)
  ├── Outro evento → log + HTTP 200 (ignorado)
  └── Aprovado → continua
        │
        ▼
  Mapear product_id → course_id (variável de ambiente)
  ├── Não mapeado → log de aviso + HTTP 200
  └── Mapeado → continua
        │
        ▼
  Moodle: core_user_get_users(email)
  ├── Usuário EXISTE → usar ID existente
  └── Usuário NÃO EXISTE → core_user_create_users
        │                  (username, senha temporária,
        │                   firstname, lastname, lang=pt_br)
        ▼
  Moodle: enrol_manual_enrol_users(userid, courseid)
        │
        ▼
  SMTP: enviar e-mail de boas-vindas
  "Acesse cursos.educacomtalento.com
   Use 'Esqueci minha senha' para definir acesso"
        │
        ▼
  Log: COMPRA APROVADA | email | produto | curso
  HTTP 200 {"status": "matrícula realizada"}
        │
        ▼
  Aluno recebe e-mail → define senha → acessa o curso
  (< 60 segundos após pagamento)
```

---

## 4. Fluxo de Reembolso

```
Aluno solicita reembolso
        │
        ▼
  Hotmart/Kiwify processa reembolso
        │
        │ POST webhook (evento refund)
        ▼
  Flask verifica assinatura → continua
        │
        ▼
  Verificar evento (REFUNDED / CHARGEBACK / refunded)
        │
        ▼
  Mapear product_id → course_id
        │
        ▼
  Moodle: core_user_get_users(email)
  ├── Não encontrado → log + HTTP 200
  └── Encontrado → enrol_manual_unenrol_users(userid, courseid)
        │
        ▼
  Log: REEMBOLSO | email | produto | curso
  HTTP 200 {"status": "matrícula removida"}

Nota: a conta do aluno no Moodle é MANTIDA.
Apenas a matrícula no curso é removida.
Isso preserva histórico e facilita recompra.
```

---

## 5. Segurança

### Verificação de Assinatura

| Plataforma | Mecanismo | Header |
|------------|-----------|--------|
| Hotmart | Token fixo (Hottok) — `hmac.compare_digest` | `X-Hotmart-Webhook-Token` |
| Kiwify | HMAC-SHA1 do body com secret | `X-Kiwify-Signature` |

O uso de `hmac.compare_digest` previne timing attacks.

### Isolamento de Rede

```
Internet (porta 443) → nginx → /webhook/* → 127.0.0.1:5000 (loopback)
Flask → 127.0.0.1:8080 (Moodle, somente loopback)
MariaDB → rede Docker interna (nunca exposta)
```

### Princípio do Mínimo Privilégio

- Container Flask roda como usuário `webhook` (não-root)
- Token Moodle com capacidades mínimas necessárias
- Senha SMTP via App Password do Google

### Rate Limiting nginx (adicionar ao bloco Moodle)

```nginx
# Adicionar no nginx.conf (global http block):
limit_req_zone $binary_remote_addr zone=webhook:10m rate=30r/m;

# Adicionar no server block de cursos.educacomtalento.com:
location /webhook/ {
    limit_req zone=webhook burst=10 nodelay;
    proxy_pass         http://127.0.0.1:5000;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_read_timeout 30s;
}
```

---

## 6. Mapeamento Produto × Curso

Configurado 100% via variáveis de ambiente no arquivo `.env`. Sem alteração de código.

### Formato

```bash
# Hotmart: HOTMART_MAP_<ID_NO_HOTMART>=<ID_CURSO_MOODLE>
HOTMART_MAP_123456=2

# Kiwify: KIWIFY_MAP_<ID_NO_KIWIFY>=<ID_CURSO_MOODLE>
KIWIFY_MAP_prod_abc123=2
```

### Como encontrar os IDs

**ID do produto — Hotmart:**
Painel Hotmart > Meus Produtos > URL contém o ID numérico

**ID do produto — Kiwify:**
Painel Kiwify > Produtos > Configurações do produto

**ID do curso — Moodle:**
Admin > Cursos > Gerenciar cursos > URL de edição contém `?id=N`

### Tabela de Mapeamento Atual

| Plataforma | ID Produto | Course ID | Curso Moodle |
|------------|------------|-----------|--------------|
| Hotmart | *(preencher)* | 2 | Foco e Produtividade nos Estudos |
| Hotmart | *(preencher)* | 3 | Metodologias de Ensino |
| Kiwify  | *(preencher)* | 2 | Foco e Produtividade nos Estudos |
| Kiwify  | *(preencher)* | 3 | Metodologias de Ensino |

---

## 7. Monitoramento e Logs

### Localização

```
/opt/educa-com-talento/webhook-matricula/
└── logs/
    ├── webhook.log    # log principal da aplicação
    └── access.log     # log HTTP do Gunicorn
```

### Comandos úteis

```bash
# Logs em tempo real
docker logs -f webhook-matricula

# Log da aplicação
docker exec webhook-matricula tail -f /app/logs/webhook.log

# Erros recentes
docker logs webhook-matricula 2>&1 | grep ERROR | tail -20

# Health check
curl https://cursos.educacomtalento.com/webhook/health

# Buscar matrícula específica
docker exec webhook-matricula grep "aluno@email.com" /app/logs/webhook.log
```

### Formato de Log

```
[2026-03-15 14:32:01] INFO Hotmart recebido: {"event": "PURCHASE_APPROVED"...}
[2026-03-15 14:32:01] INFO Usuário existente: id=42 email=aluno@gmail.com
[2026-03-15 14:32:02] INFO Matrícula realizada: user_id=42 course_id=2
[2026-03-15 14:32:03] INFO E-mail de boas-vindas enviado para aluno@gmail.com
[2026-03-15 14:32:03] INFO [HOTMART] COMPRA APROVADA | email=aluno@gmail.com | produto=123456 | curso=2
```

---

## 8. Plataformas Suportadas

### Hotmart

- **Endpoint:** `POST /webhook/hotmart`
- **Autenticação:** Header `X-Hotmart-Webhook-Token`
- **Configurar em:** Ferramentas > Webhooks > Adicionar URL
- **URL a cadastrar:** `https://cursos.educacomtalento.com/webhook/hotmart`
- **Eventos tratados:**

| Evento | Ação |
|--------|------|
| `PURCHASE_APPROVED` | Matrícula |
| `PURCHASE_COMPLETE` | Matrícula |
| `PURCHASE_REFUNDED` | Cancelamento |
| `PURCHASE_CHARGEBACK` | Cancelamento |
| `PURCHASE_CANCELED` | Cancelamento |

### Kiwify

- **Endpoint:** `POST /webhook/kiwify`
- **Autenticação:** Header `X-Kiwify-Signature` (HMAC-SHA1)
- **Configurar em:** Configurações > Webhooks
- **URL a cadastrar:** `https://cursos.educacomtalento.com/webhook/kiwify`
- **Eventos tratados:**

| `order_status` | Ação |
|----------------|------|
| `paid` | Matrícula |
| `refunded` | Cancelamento |
| `chargedback` | Cancelamento |

### Adicionar Nova Plataforma

1. Criar rota `@app.route("/webhook/plataforma", methods=["POST"])`
2. Implementar função de verificação de assinatura
3. Mapear campos para `email`, `firstname`, `lastname`, `product_id`, `evento`
4. Chamar `process_purchase()` ou `process_refund()`
5. Adicionar `PLATAFORMA_MAP_<ID>=<COURSE_ID>` no `.env`
6. Reiniciar: `docker compose restart webhook-matricula`

---

## 9. Contingência

### Aluno comprou mas não recebeu acesso

```bash
# 1. Verificar se o webhook chegou
grep "email_do_aluno" /opt/educa-com-talento/webhook-matricula/logs/webhook.log

# 2. Fazer matrícula manual no Moodle
# Admin > Cursos > Participantes > Matricular usuários

# 3. Verificar container
docker ps | grep webhook-matricula
```

### Webhook não chegou (timeout/5xx)

- Hotmart e Kiwify reenviam automaticamente após falha
- Verificar nginx: `curl http://127.0.0.1:5000/webhook/health`
- Verificar container: `docker compose logs webhook-matricula`

### Atualizar token Moodle

```bash
# 1. Gerar novo token em: Admin > Web Services > Gerenciar tokens
# 2. Atualizar .env
nano /opt/educa-com-talento/webhook-matricula/.env

# 3. Reiniciar sem downtime
docker compose up -d --force-recreate webhook-matricula
```

---

## 10. Roadmap

| Versão | Feature | Prioridade |
|--------|---------|------------|
| v1.0 | Hotmart + Kiwify, matrícula/cancelamento, e-mail boas-vindas | **Atual** |
| v1.1 | Dashboard web de transações (SQLite) | Alta |
| v1.2 | Suporte a Eduzz e Monetizze | Média |
| v1.3 | Notificação de abandono (7 dias sem acesso) | Média |
| v2.0 | Integração Next.js: verificar matrícula logada | Alta |
| v2.1 | Cupons de desconto + regras de bundle | Baixa |
| v2.2 | Conclusão de curso → certificado automático | Alta |
