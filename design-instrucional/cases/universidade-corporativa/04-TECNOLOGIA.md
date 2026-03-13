# Fase 4 — Tecnologia: Seleção e Implantação do LMS | UC TechSul

---

## Objetivo da Fase

Selecionar, implementar e configurar o ecossistema tecnológico de aprendizagem da Universidade TechSul, garantindo que a plataforma suporte os objetivos pedagógicos, integre-se com os sistemas existentes e ofereça experiência de alto nível para os aprendizes.

**Duração:** 8 semanas
**Investimento:** R$ 80.000 (inclui licença ano 1, implantação e integrações)
**Entregáveis:** LMS configurado e em produção + Manual do Administrador + Treinamento da Equipe

---

## 1. Processo de Seleção do LMS

### 1.1 Requisitos Definidos na Análise

**Requisitos Pedagógicos (must-have):**
- ✅ Suporte a SCORM 1.2, SCORM 2004 e xAPI
- ✅ Trilhas de aprendizagem com pré-requisitos e sequenciamento
- ✅ Gamificação nativa (pontos, badges, ranking, níveis)
- ✅ Certificados automáticos com critérios configuráveis
- ✅ Fóruns de discussão por curso
- ✅ Avaliações com banco de questões e tentativas configuráveis
- ✅ Aplicativo móvel nativo (iOS + Android)
- ✅ Relatórios detalhados por usuário, curso e área

**Requisitos Técnicos (must-have):**
- ✅ Integração SSO com Azure Active Directory (empresa usa Microsoft 365)
- ✅ API REST para integração com sistema de RH (TOTVS)
- ✅ Suporte a LGPD (dados no Brasil ou opção de configurar)
- ✅ SLA mínimo de 99,5% de uptime
- ✅ Suporte em português

**Requisitos Desejáveis (nice-to-have):**
- ⭕ LXP (Learning Experience Platform) com recomendações por IA
- ⭕ Social learning avançado (comunidades de prática)
- ⭕ Integração com LinkedIn Learning / Coursera
- ⭕ Analytics preditivo de risco de abandono

### 1.2 Plataformas Avaliadas (Shortlist)

| Critério (peso) | Moodle Workplace | Totara Learn | TalentLMS | Docebo |
|---|---|---|---|---|
| Funcionalidades pedagógicas (25%) | 9 | 9 | 7 | 9 |
| Experiência do usuário (20%) | 6 | 7 | 9 | 9 |
| Integração com AD/RH (20%) | 8 | 9 | 7 | 8 |
| Suporte e parceiro Brasil (15%) | 8 | 8 | 6 | 7 |
| Custo-benefício (15%) | 8 | 9 | 9 | 6 |
| Gamificação (5%) | 7 | 9 | 8 | 8 |
| **TOTAL** | **7,85** | **8,65** | **7,75** | **8,20** |

### 1.3 Plataforma Escolhida: Totara Learn

**Por quê Totara Learn?**
- Fork corporativo do Moodle com governança comercial robusta
- Melhor gamificação nativa do shortlist (Audiences + Badges + Learning Plans)
- Parceiro brasileiro certificado com suporte em PT-BR
- Integração SSO com Azure AD (connector nativo)
- API para TOTVS disponível via parceiro
- Custo-benefício superior ao Docebo para 1.200 usuários

**Licença contratada:** Totara Learn Enterprise — 1.500 usuários
**Hospedagem:** Cloud (AWS São Paulo — compliance LGPD)
**Custo:** R$ 48.000/ano (1° ano incluído no CAPEX)

---

## 2. Arquitetura do Ecossistema de Aprendizagem

```
┌────────────────────────────────────────────────────────────────────┐
│                    ECOSSISTEMA DE APRENDIZAGEM TECHSUL              │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     TOTARA LEARN (LMS)                       │  │
│  │   Portal da UC | Trilhas | Cursos | Gamificação | Analytics  │  │
│  └──────────────┬───────────────────────┬───────────────────────┘  │
│                 │                       │                           │
│         ┌───────┴──────┐        ┌───────┴──────┐                  │
│         │   CONTEÚDOS  │        │  INTEGRAÇÕES │                  │
│         │   INTERNOS   │        │              │                  │
│         │              │        │ • Azure AD   │                  │
│         │ Articulate   │        │   (SSO)      │                  │
│         │ Rise (SCORM) │        │ • TOTVS RH   │                  │
│         │              │        │   (sync.     │                  │
│         │ H5P (interac.│        │   usuários)  │                  │
│         │ no Moodle)   │        │ • Credly     │                  │
│         │              │        │   (badges)   │                  │
│         │ Videoaulas   │        │ • LinkedIn   │                  │
│         │ (Panopto)    │        │   Learning   │                  │
│         └──────────────┘        └──────────────┘                  │
│                 │                                                   │
│         ┌───────┴────────────────────┐                            │
│         │      CONTEÚDOS EXTERNOS    │                            │
│         │  LinkedIn Learning License │                            │
│         │  (2.500+ cursos em PT)    │                            │
│         └────────────────────────────┘                            │
└────────────────────────────────────────────────────────────────────┘
```

---

## 3. Configuração Pedagógica do Totara Learn

### 3.1 Hierarquia de Organização

```
TOTARA LEARN — UNIVERSIDADE TECHSUL
├── ESCOLA DE TECNOLOGIA
│   ├── Trilha Cloud & DevOps
│   │   ├── Módulo 1: Cloud Fundamentos [20h]
│   │   ├── Módulo 2: AWS Essentials [25h]
│   │   └── ... (mais módulos)
│   └── ... (mais trilhas)
├── ESCOLA DE NEGÓCIOS
├── ESCOLA DE LIDERANÇA
├── ESCOLA DE CULTURA
└── PROGRAMAS ESPECIAIS
    ├── Onboarding (todos os novos colaboradores)
    └── Trilha HiPo
```

### 3.2 Configuração de Gamificação

**Sistema de Pontos:**
| Ação | Pontos |
|---|---|
| Completar uma aula | 10 pts |
| Completar um curso | 50 pts |
| Completar uma trilha | 200 pts |
| Participar de fórum | 5 pts |
| Facilitador de Tech Talk | 100 pts |
| Certificação externa aprovada | 150 pts |

**Níveis de Aprendiz:**
| Nível | Pontos Necessários | Benefício |
|---|---|---|
| Explorador | 0–500 pts | Acesso ao catálogo básico |
| Praticante | 500–2.000 pts | +5 horas extras de aprendizagem/mês |
| Especialista | 2.000–6.000 pts | Acesso a conteúdos premium + mentoria |
| Mestre | 6.000+ pts | Convite para trilha HiPo + reconhecimento público |

**Badges emitidos via Totara + Credly (Open Badges verificáveis externamente):**
- Badge por conclusão de cada trilha
- Badge por certificação interna aprovada
- Badge especial "Colaborador do Mês" por Learning Analytics

### 3.3 Dashboard de Analytics Configurado

**Dashboard do Aprendiz (visão pessoal):**
- Progresso nas trilhas inscritas
- Pontos e nível atual
- Certificados obtidos
- Próximos vencimentos de cursos obrigatórios

**Dashboard do Gestor:**
- Progresso da equipe por colaborador
- Alertas de cursos obrigatórios não concluídos
- Ranking de engajamento da equipe
- Horas de aprendizagem nos últimos 30/90/365 dias

**Dashboard do CLO (estratégico):**
- Engajamento geral por área
- NPS dos cursos por escola
- Taxa de completude por trilha
- Custo por hora de aprendizagem
- ROI do programa (cruzado com dados de RH)
- Alertas de colaboradores em risco de abandono

---

## 4. Integrações Técnicas

### 4.1 SSO com Azure Active Directory

**Implementação:**
- Protocolo: SAML 2.0
- Provisionamento automático de usuários via SCIM
- Grupos do AD mapeados para audiências no Totara (ex: Colaborador Novo → Trilha Onboarding)
- Desativação automática de acesso quando colaborador sai da empresa (via desativação no AD)

**Benefício operacional:** Zero cadastro manual de usuários. Quando RH contrata no TOTVS, o colaborador aparece automaticamente no Totara com a trilha correta já atribuída.

### 4.2 Integração com TOTVS RH

**Dados sincronizados (via API TOTVS → Totara):**
- Nome, e-mail, cargo, área, gestor direto, data de admissão
- Dados sincronizados diariamente às 2h da manhã
- Quando cargo muda → trilha muda automaticamente
- Relatório de conclusão de onboarding enviado automaticamente para o TOTVS

### 4.3 Integração com Credly (Open Badges)

**Fluxo:**
1. Colaborador conclui trilha + aprovação no projeto prático
2. Totara aciona automaticamente o webhook do Credly
3. Badge digital emitido e enviado por email ao colaborador
4. Colaborador adiciona ao LinkedIn com 1 clique

---

## 5. Infraestrutura e Segurança

| Componente | Configuração |
|---|---|
| Hospedagem | AWS São Paulo (sa-east-1) |
| Alta disponibilidade | Multi-AZ com failover automático |
| Backup | Diário com retenção de 30 dias |
| SSL/TLS | Certificado Let's Encrypt (HTTPS obrigatório) |
| LGPD | Dados processados e armazenados no Brasil |
| DPO Notificação | Incidentes notificados via protocolo definido |
| Monitoramento | Uptime Robot + alertas para equipe técnica |
| SLA | 99,7% de uptime (medido mensalmente) |

---

## 6. Treinamento da Equipe Interna

### Módulo 1 — Administração do Totara (16h)
- Gerenciamento de usuários e audiências
- Configuração de cursos e trilhas
- Upload e publicação de SCORM/xAPI
- Configuração de relatórios e dashboards
- Gestão de gamificação e badges

### Módulo 2 — Produção de Conteúdo para Totara (8h)
- H5P para interatividade básica (sem Articulate)
- Upload e configuração de SCORM externo
- Fóruns de discussão: moderação e facilitação
- Configuração de avaliações e banco de questões

### Módulo 3 — Learning Analytics para Gestores (4h)
- Como usar os dashboards de equipe
- Interpretação de relatórios de engajamento
- Como identificar colaboradores em risco de abandono
- Como usar dados para coaching e 1:1

---

## Entregáveis da Fase 4

| Entregável | Status |
|---|---|
| Totara Learn configurado e em produção | ✅ Concluído |
| SSO Azure AD integrado e testado | ✅ Concluído |
| Integração TOTVS-Totara operacional | ✅ Concluído |
| Integração Credly configurada | ✅ Concluído |
| Dashboards de analytics (aprendiz, gestor, CLO) | ✅ Configurados |
| Gamificação ativa (pontos, badges, níveis) | ✅ Ativo |
| Manual do Administrador (60 páginas) | ✅ Entregue |
| Treinamento da equipe (28h total) | ✅ Realizado |

---

→ **Próxima fase:** [Cronograma de Implementação](05-CRONOGRAMA.md)
