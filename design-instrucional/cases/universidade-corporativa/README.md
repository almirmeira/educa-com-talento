# Case 1 — Universidade Corporativa TechSul Sistemas

![Tipo](https://img.shields.io/badge/tipo-Universidade%20Corporativa-blue)
![Setor](https://img.shields.io/badge/setor-Tecnologia%20da%20Informação-purple)
![Porte](https://img.shields.io/badge/porte-1.200%20colaboradores-orange)
![Investimento](https://img.shields.io/badge/investimento-R%24380k%20CAPEX%20%2B%20R%2415k%2Fmês-gold)
![Prazo](https://img.shields.io/badge/prazo-9%20meses-green)

---

## Sumário Executivo

A **TechSul Sistemas** é uma empresa de tecnologia com 1.200 colaboradores, atuando em desenvolvimento de software, cloud e serviços gerenciados de TI. A empresa experimentava um turnover anual de 28% (acima dos 18% do setor), tempo médio de onboarding de 90 dias (o dobro do benchmark), e uma pesquisa interna revelou que 71% dos colaboradores não enxergavam perspectiva clara de crescimento interno.

A Educa com Talento foi contratada para estruturar a **Universidade TechSul** — do zero ao pleno funcionamento — em 9 meses, com foco imediato na redução de turnover e aceleração de performance técnica.

---

## Índice do Case

1. [Diagnóstico e Business Case](01-DIAGNOSTICO.md)
2. [Projeto Pedagógico e Arquitetura da UC](02-PROJETO-PEDAGOGICO.md)
3. [Governança e Estrutura Organizacional](03-GOVERNANCA.md)
4. [Tecnologia — Seleção e Implantação do LMS](04-TECNOLOGIA.md)
5. [Cronograma de Implementação](05-CRONOGRAMA.md)
6. [Métricas, KPIs e ROI](06-METRICAS-ROI.md)

---

## Dados do Projeto

| Item | Dado |
|---|---|
| **Cliente** | TechSul Sistemas (empresa fictícia — case de referência) |
| **Setor** | Tecnologia da Informação |
| **Colaboradores** | 1.200 (650 técnicos + 350 comercial + 200 operações) |
| **Distribuição** | 4 estados (RS, SC, PR, SP) + 60% remoto |
| **Contratante** | VP de Pessoas + CLO recém-contratado |
| **Investimento total** | R$ 380.000 (CAPEX) + R$ 15.000/mês (OPEX a partir do mês 7) |
| **Prazo de implementação** | 9 meses (fases 1–5) |
| **Metodologia DI** | ADDIE + LXD + 70-20-10 |
| **Plataforma** | Totara Learn (fork corporativo do Moodle) |
| **Padrões técnicos** | xAPI + SCORM 1.2 |
| **Certificação** | Open Badges via Credly |

---

## Problema Inicial (Dor do Cliente)

```
┌──────────────────────────────────────────────────────────────────┐
│                     DIAGNÓSTICO INICIAL                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TURNOVER ANUAL:  28%  (benchmark do setor: 18%)                │
│  Custo por reposição de colaborador técnico: R$ 35.000          │
│  Custo anual de turnover: 28% × 1.200 × R$ 35.000 = R$11,76M  │
│                                                                  │
│  ONBOARDING:  90 dias para produtividade plena                  │
│  (benchmark: 45 dias)                                            │
│                                                                  │
│  DESENVOLVIMENTO:  71% sem perspectiva de crescimento           │
│  Promoções internas: apenas 12% das vagas                       │
│                                                                  │
│  T&D ATUAL:  R$ 450/colaborador/ano                             │
│  (benchmark ATD: R$ 1.800-3.500/colaborador/ano)                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Resultados Alcançados (12 meses pós-lançamento)

| Indicador | Antes | Meta | Resultado |
|---|---|---|---|
| Turnover anual | 28% | 20% | **19,3%** ✓ |
| Tempo de onboarding | 90 dias | 50 dias | **47 dias** ✓ |
| Taxa de completude de cursos | — | >75% | **82%** ✓ |
| NPS do programa | — | >50 | **67** ✓ |
| Promoções internas | 12% | 30% | **34%** ✓ |
| Percepção de crescimento | 29% | 60% | **68%** ✓ |
| Custo de reposição evitado | — | R$3,1M/ano | **R$3,5M/ano** ✓ |
| ROI do programa | — | 250% | **320%** ✓ |

---

## Arquitetura da Universidade TechSul

```
┌─────────────────────────────────────────────────────────────────────┐
│                       UNIVERSIDADE TECHSUL                           │
│                   "Aprender é a nossa tecnologia"                    │
├─────────────────┬────────────────┬───────────────┬──────────────────┤
│  ESCOLA         │  ESCOLA        │  ESCOLA       │  ESCOLA          │
│  DE TECNOLOGIA  │  DE NEGÓCIOS   │  DE LIDERANÇA │  DE CULTURA      │
│                 │                │               │                  │
│ • Cloud & DevOps│ • Vendas B2B   │ • Gestão de   │ • Cultura TechSul│
│ • Ciberseg.     │ • Sucesso do   │   Equipes     │ • Ética e Compli.│
│ • Dados & IA    │   Cliente      │ • Gestão      │ • LGPD           │
│ • Arquitetura   │ • Financeiro   │   Ágil        │ • ESG            │
│ • Dev Software  │   para TI      │ • Coaching    │ • Inovação       │
└─────────────────┴────────────────┴───────────────┴──────────────────┘
         │                │               │               │
         └────────────────┴───────────────┴───────────────┘
                                  │
                    ┌─────────────────────────┐
                    │   PROGRAMAS TRANSVERSAIS │
                    │  • Onboarding Acelerado  │
                    │  • Trilha HiPo (Top 10%) │
                    │  • Certificações Externas│
                    └─────────────────────────┘
```

---

## Investimento Detalhado

| Fase | Escopo | Investimento |
|---|---|---|
| Fase 1 — Diagnóstico | Assessment + business case + apresentação C-Level | R$ 25.000 |
| Fase 2 — Modelagem | Arquitetura pedagógica + identidade + governança | R$ 45.000 |
| Fase 3 — Tecnologia | Seleção LMS + implantação Totara + integrações | R$ 80.000 |
| Fase 4 — Conteúdo | 12 cursos iniciais (onboarding + compliance + técnicos) | R$ 180.000 |
| Fase 5 — Lançamento | Treinamento equipe + comunicação interna + go-live | R$ 50.000 |
| **Total CAPEX** | | **R$ 380.000** |
| OPEX Mensal | Operação gerenciada + 2 novos cursos/mês + suporte | **R$ 15.000/mês** |

---

*Documentação completa nas fases: [Diagnóstico](01-DIAGNOSTICO.md) → [Projeto Pedagógico](02-PROJETO-PEDAGOGICO.md) → [Governança](03-GOVERNANCA.md) → [Tecnologia](04-TECNOLOGIA.md) → [Cronograma](05-CRONOGRAMA.md) → [Métricas e ROI](06-METRICAS-ROI.md)*
