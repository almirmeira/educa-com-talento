# Educa com Talento - Plataforma de Cursos Online

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Docker](https://img.shields.io/badge/docker-24%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Moodle](https://img.shields.io/badge/Moodle-LMS-orange)

## Sobre o Projeto

**Educa com Talento** é uma plataforma educacional completa que combina um website institucional moderno com um sistema de gestão de aprendizagem (LMS) baseado em Moodle.

### Componentes

1. **Website Institucional** - Desenvolvido em Next.js 14 com design responsivo
2. **Plataforma de Cursos** - Moodle LMS para gestão de cursos online
3. **Infraestrutura Docker** - Deploy containerizado para fácil migração e escalabilidade

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     Nginx (Reverse Proxy)                    │
│                      Porta 80 / 443                          │
└──────────┬──────────────────────────────────┬───────────────┘
           │                                  │
           ▼                                  ▼
┌─────────────────────┐          ┌─────────────────────────────┐
│   Next.js Site      │          │         Moodle LMS          │
│   (Container)       │          │        (Container)          │
│   Porta: 3000       │          │       Porta: 8080           │
└─────────────────────┘          └──────────────┬──────────────┘
                                                │
                                                ▼
                                 ┌─────────────────────────────┐
                                 │      MariaDB Database       │
                                 │        (Container)          │
                                 │       Porta: 3306           │
                                 └─────────────────────────────┘
```

---

## Estrutura do Projeto

```
educa-com-talento/
├── docker-compose.yml      # Orquestração dos containers
├── .env                    # Variáveis de ambiente (NÃO COMMITAR)
├── .env.example            # Exemplo de variáveis
├── README.md               # Este arquivo
├── MIGRATION-GUIDE.md      # Guia de migração para produção
│
├── site/                   # Website Next.js
│   ├── Dockerfile          # Build do container
│   ├── src/
│   │   ├── app/            # App Router (Next.js 14)
│   │   ├── components/     # Componentes React
│   │   └── styles/         # Estilos CSS
│   ├── public/             # Assets estáticos
│   └── package.json
│
├── nginx/                  # Configuração do proxy reverso
│   ├── nginx.conf          # Configuração principal
│   └── conf.d/
│       └── default.conf    # Virtual hosts
│
├── moodle/                 # Configurações customizadas do Moodle
│   └── theme/              # Tema personalizado
│
├── scripts/                # Scripts de automação
│   ├── deploy.sh           # Deploy da aplicação
│   ├── backup.sh           # Backup automatizado
│   └── hardening.sh        # Hardening de segurança
│
├── backups/                # Diretório de backups (não versionado)
├── ssl/                    # Certificados SSL (não versionado)
│
└── docs/                   # Documentação adicional
    ├── CURSOS.md           # Documentação dos cursos
    └── API.md              # Documentação da API (futuro)
```

---

## Requisitos

### Ambiente de Desenvolvimento
- Docker 24+
- Docker Compose 2+
- Node.js 20+ (para desenvolvimento local)
- Git

### Servidor de Produção
- **CPU**: 2 vCPU (mínimo 1)
- **RAM**: 2 GB (mínimo 1 GB)
- **Disco**: 40 GB SSD (mínimo 20 GB)
- **SO**: Ubuntu 22.04/24.04 LTS

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/educa-com-talento.git
cd educa-com-talento
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Editar .env com suas configurações
nano .env
```

### 3. Executar deploy

```bash
./scripts/deploy.sh
```

### 4. Acessar os serviços

- **Website**: http://localhost ou http://IP_SERVIDOR
- **Moodle**: http://localhost:8080 ou http://IP_SERVIDOR:8080

---

## URLs de Acesso

| Serviço | URL Staging | URL Produção (planejado) |
|---------|-------------|--------------------------|
| Website | http://192.168.1.46 | https://educacomtalento.com.br |
| Moodle | http://192.168.1.46:8080 | https://cursos.educacomtalento.com.br |

---

## Cursos Disponíveis

| Curso | Carga Horária | Aulas | Módulos | Status |
|-------|---------------|-------|---------|--------|
| [Foco e Produtividade nos Estudos](./cursos/foco-produtividade/) | 30h | 30 | 2 | ✅ Ativo |
| [Metodologias de Ensino](./cursos/metodologias-ensino/) | 40h | 20 | 5 | ✅ Ativo |

### FOCO E PRODUTIVIDADE NOS ESTUDOS

Curso completo sobre técnicas de foco, produtividade e aprendizado efetivo.

**Estrutura:**
- **Módulo 1**: Hiperfoco e Hiperprodutividade (20 aulas)
- **Módulo 2**: Foco Disperso e Maestria (10 aulas)

**Conteúdo inclui:**
- Videoaulas
- Atividades práticas
- Infográficos
- Materiais de apoio
- Links adicionais

### METODOLOGIAS DE ENSINO

Curso completo para educadores sobre metodologias de ensino tradicionais e inovadoras.

**Estrutura:**
- **Módulo 1**: Fundamentos e Evolução (4 aulas)
- **Módulo 2**: Metodologias Clássicas (4 aulas)
- **Módulo 3**: Metodologias Ativas (4 aulas)
- **Módulo 4**: Tecnologia e Socioemocional (4 aulas)
- **Módulo 5**: Implementação e Avaliação (4 aulas)

**Conteúdo inclui:**
- Videoaulas
- Infográficos detalhados por aula
- Objetivos de aprendizagem
- Atividades práticas

> Veja documentação completa em [docs/CURSOS.md](docs/CURSOS.md)

---

## Scripts Disponíveis

### Deploy
```bash
./scripts/deploy.sh
```
Realiza o build e deploy de todos os containers.

### Backup
```bash
./scripts/backup.sh
```
Cria backup completo do banco de dados e arquivos.

### Hardening
```bash
./scripts/hardening.sh
```
Aplica configurações de segurança no servidor.

---

## Configuração de Produção

Consulte o arquivo [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) para instruções detalhadas de migração para hospedagem comercial, incluindo:

- Requisitos do servidor
- Provedores recomendados
- Configuração de DNS
- Certificados SSL/TLS
- Checklist pós-migração

---

## Segurança

### Medidas Implementadas

- [x] Firewall UFW configurado
- [x] Fail2ban para proteção contra brute-force
- [x] Headers de segurança no Nginx
- [x] Hardening SSH
- [x] Variáveis sensíveis em .env
- [ ] Certificados SSL (aguardando produção)
- [ ] Rate limiting

### Portas Abertas

| Porta | Serviço | Observação |
|-------|---------|------------|
| 22 | SSH | Acesso administrativo |
| 80 | HTTP | Website e Moodle |
| 443 | HTTPS | Website e Moodle (produção) |

---

## Manutenção

### Logs

```bash
# Logs de todos os containers
docker compose logs -f

# Logs específicos
docker compose logs -f site
docker compose logs -f moodle
docker compose logs -f nginx
```

### Atualização

```bash
# Atualizar código
git pull origin main

# Rebuild e restart
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Backup Manual

```bash
./scripts/backup.sh
# Backups salvos em /opt/educa-com-talento/backups/
```

---

## Identidade Visual

### Cores

| Nome | Hexadecimal | Uso |
|------|-------------|-----|
| Verde Principal | #2E7D32 | Headers, botões primários |
| Verde Claro | #4CAF50 | Destaques, hover |
| Verde Escuro | #1B5E20 | Textos importantes |
| Branco | #FFFFFF | Backgrounds |
| Cinza Escuro | #333333 | Texto principal |

### Tipografia

- **Títulos**: Montserrat Bold
- **Corpo**: Open Sans Regular
- **Destaques**: Montserrat Medium

---

## Contribuição

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## Contato

- **Email**: contato@educacomtalento.com.br
- **Website**: https://educacomtalento.com.br (em breve)

---

## Licença

Este projeto é proprietário e todos os direitos são reservados.

© 2024 Educa com Talento. Todos os direitos reservados.

---

*Documentação atualizada em: Dezembro 2024*
