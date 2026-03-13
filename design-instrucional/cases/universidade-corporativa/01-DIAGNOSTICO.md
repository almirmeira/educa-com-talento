# Fase 1 — Diagnóstico e Business Case | UC TechSul

---

## Objetivo da Fase

Mapear o estado atual de aprendizagem e desenvolvimento da TechSul, identificar as lacunas críticas de competências, construir o business case para aprovação da UC pela alta direção e definir as prioridades estratégicas do programa.

**Duração:** 6 semanas
**Investimento:** R$ 25.000
**Entregáveis:** Relatório de Diagnóstico + Business Case + Apresentação C-Level

---

## 1. Metodologia de Diagnóstico

### 1.1 Triangulação de Dados

Utilizamos a metodologia de triangulação com 4 fontes de evidência:

```
         DADOS QUANTITATIVOS
         (RH, sistemas, métricas)
                 │
ENTREVISTAS ─────┼───── PESQUISAS
C-LEVEL          │     (colaboradores
E GESTORES       │      e gestores)
                 │
         ANÁLISE DOCUMENTAL
         (processos, descrição
          de cargos, organograma)
```

### 1.2 Instrumentos Aplicados

**Entrevistas Semiestruturadas (duração: 60 min cada)**

| Nível | Quantidade | Foco |
|---|---|---|
| C-Level (CEO, CTO, CFO, VP Pessoas) | 4 | Estratégia, visão de futuro, gaps críticos |
| Gerentes Seniores | 12 | Lacunas de equipe, desafios de gestão |
| Tech Leads e Specialists | 15 | Competências técnicas em falta, onboarding |
| Colaboradores (amostra) | 30 | Experiência de desenvolvimento, expectativas |
| Ex-colaboradores (saíram nos últimos 6 meses) | 10 | Motivos de saída, percepção de carreira |

**Total entrevistado:** 71 pessoas em 4 semanas

**Survey Digital (aplicado em toda a empresa)**
- 1.200 colaboradores convidados
- 847 respondentes (71% de participação)
- 28 questões com escala Likert + 4 questões abertas
- Ferramenta: Google Forms / Microsoft Forms

---

## 2. Análise de Dados de RH

### 2.1 Dados de Turnover

| Área | Headcount | Turnover Anual | Custo Estimado |
|---|---|---|---|
| Desenvolvimento de Software | 380 | 32% | R$ 4,25M |
| Cloud & Infraestrutura | 180 | 27% | R$ 1,70M |
| Comercial | 350 | 24% | R$ 2,94M |
| Operações / CS | 200 | 22% | R$ 1,54M |
| Administrativo e Gestão | 90 | 15% | R$ 0,47M |
| **TOTAL** | **1.200** | **28%** | **R$ 10,90M** |

**Metodologia de cálculo do custo de turnover:**
```
Custo por reposição = (Recrutamento) + (Treinamento inicial) + (Produtividade perdida)
                    = R$ 8.000 + R$ 7.000 + R$ 20.000
                    = R$ 35.000 por colaborador técnico
                    = R$ 22.000 por colaborador não técnico
```

### 2.2 Análise de Tempo até Produtividade (Time-to-Performance)

| Nível | Benchmark do Setor | TechSul Atual | Gap |
|---|---|---|---|
| Analista Jr. | 45 dias | 95 dias | +50 dias |
| Analista Pl. (externo) | 30 dias | 60 dias | +30 dias |
| Sênior/Tech Lead | 20 dias | 35 dias | +15 dias |

**Custo do gap de produtividade por contratação:**
- Analista Jr.: 50 dias × 75% do salário diário = ~R$ 5.600
- Analista Pl.: 30 dias × 100% do salário diário = ~R$ 5.000
- Total estimado anual (baseado em contratações): R$ 1,2M

---

## 3. Gap Analysis de Competências

### 3.1 Mapeamento de Competências Críticas

Utilizamos o framework de 4 quadrantes para classificar as competências:

```
                    CRITICIDADE ESTRATÉGICA
                    Alta           Baixa
              ┌─────────────┬─────────────┐
         Alta │  PRIORIDADE │  MANTER E   │
              │  MÁXIMA     │  MONITORAR  │
   LACUNA     │  (Ação agora│             │
   ATUAL      │   urgente)  │             │
              ├─────────────┼─────────────┤
         Baixa│  PLANEJAR   │  BAIXA      │
              │  MÉDIO PRAZO│  PRIORIDADE │
              │             │             │
              └─────────────┴─────────────┘
```

### 3.2 Competências Técnicas — Resultado do Gap Analysis

| Competência | Criticidade | Lacuna Atual | Prioridade |
|---|---|---|---|
| Cloud Architecture (AWS/Azure/GCP) | Alta | Alta (67% dos devs) | **MÁXIMA** |
| Cibersegurança aplicada | Alta | Alta (73% dos colaboradores) | **MÁXIMA** |
| DevOps / CI-CD / IaC | Alta | Média (45% dos devs) | **MÁXIMA** |
| Dados e Analytics (SQL, Python) | Alta | Média (52%) | **ALTA** |
| Metodologias ágeis (Scrum, SAFe) | Média | Baixa (18%) | **MÉDIA** |
| Arquitetura de Microsserviços | Alta | Alta (61%) | **ALTA** |

### 3.3 Competências Comportamentais e de Liderança

| Competência | Criticidade | Lacuna Atual | Prioridade |
|---|---|---|---|
| Gestão de equipes técnicas | Alta | Alta (82% dos Tech Leads) | **MÁXIMA** |
| Comunicação executiva | Alta | Média (54% dos gestores) | **ALTA** |
| Pensamento sistêmico | Alta | Alta (68%) | **ALTA** |
| Gestão de mudanças | Média | Média (45%) | **MÉDIA** |
| Inteligência emocional | Média | Baixa (22%) | **MÉDIA** |

---

## 4. Inventário de Conteúdos Existentes

| Tipo de Conteúdo | Quantidade | Qualidade | Aproveitamento |
|---|---|---|---|
| Manuais de processo (Word/PDF) | 127 docs | Média | 30% (reaproveitamento como base de cursos) |
| Apresentações de treinamento (PPT) | 43 decks | Baixa | 15% (conteúdo desatualizado) |
| Vídeos instrucionais internos | 8 vídeos | Baixa | 5% (qualidade técnica ruim) |
| Cursos externos (LinkedIn Learning) | 0 | — | — |
| Trilhas estruturadas | 0 | — | — |

**Conclusão:** A TechSul parte praticamente do zero em termos de conteúdo educacional estruturado. O esforço de produção de conteúdo será considerável, mas há documentação de processos que pode ser aproveitada como base.

---

## 5. Pesquisa de Clima Educacional

### 5.1 Principais Resultados (847 respondentes)

| Questão | % Concordam / Positivo |
|---|---|
| "Tenho oportunidade de aprender no trabalho" | 41% |
| "Meu gestor incentiva meu desenvolvimento" | 35% |
| "A empresa investe no meu crescimento" | 28% |
| "Vejo perspectiva de crescimento aqui" | 29% |
| "Eu saberia como acessar treinamentos se precisasse" | 22% |
| "Os treinamentos que fiz foram relevantes" | 47% |

### 5.2 Principais Temas das Respostas Abertas

1. **"Não sei o que preciso aprender para crescer"** (mencionado por 312 respondentes)
2. **"Não tenho tempo para me desenvolver"** (287 respondentes)
3. **"Os treinamentos não são práticos"** (241 respondentes)
4. **"Não vejo reconhecimento por quem se desenvolve"** (198 respondentes)
5. **"Gostaria de aprender de colegas mais experientes"** (176 respondentes)

---

## 6. Análise da Concorrência em Aprendizagem (Employer Brand)

| Concorrente | UC / Programa L&D | Percepção no Mercado |
|---|---|---|
| Empresa A (grande TI) | UC estruturada, certificações AWS/Azure | "Quem quer aprender vai lá" |
| Empresa B (startup) | Udemy Business + workshops | "Informal mas rápido" |
| Empresa C (consultoria) | Academy com trilhas por sênioridade | "Melhor plano de carreira" |
| **TechSul atual** | Informal, sem estrutura | "Você se vira" |

**Impacto no recrutamento:** 23% dos candidatos que recusaram oferta da TechSul nos últimos 12 meses citaram "plano de desenvolvimento" como motivo.

---

## 7. Business Case — Apresentação para o C-Level

### 7.1 O Argumento Financeiro

```
SITUAÇÃO ATUAL (SEM UC):
  Custo de turnover anual:              R$ 10.900.000
  Custo de produtividade perdida:       R$  1.200.000
  Custo de recrutamento acelerado:      R$    800.000
  TOTAL DO PROBLEMA ANUAL:             R$ 12.900.000

INVESTIMENTO NA UC:
  CAPEX (implantação):                  R$    380.000
  OPEX anual (operação):                R$    180.000
  TOTAL DO INVESTIMENTO ANO 1:         R$    560.000

META DE REDUÇÃO (CONSERVADORA):
  Redução turnover de 28% → 20%        Economia: R$  3.100.000
  Redução tempo onboarding 50%         Economia: R$    600.000
  ECONOMIA CONSERVADORA ANO 1:        R$  3.700.000

ROI CONSERVADOR ANO 1:
  (3.700.000 - 560.000) / 560.000 = 561% de ROI
```

### 7.2 Benefícios Intangíveis (mas mensuráveis)

- **Employer brand:** Posicionamento como empresa que desenvolve talentos (benchmark: 23% de candidatos perdidos por falta de L&D)
- **Produtividade:** Colaboradores capacitados entregam mais em menos tempo
- **Inovação:** Cultura de aprendizagem correlacionada com maior geração de ideias (Google, Amazon)
- **Reputação:** Premio GPTW/Great Place to Work e Melhores Empresas para Trabalhar

### 7.3 Decisão Estratégica Aprovada pelo C-Level

Após apresentação de 2 horas com CEO, CTO e VP de Pessoas:
- ✅ Aprovação do orçamento de R$ 380.000 (CAPEX)
- ✅ Aprovação de R$ 15.000/mês (OPEX a partir do mês 7)
- ✅ Definição do CLO como responsável pela UC (reporte direto ao CEO)
- ✅ Meta: UC operacional em 9 meses
- ✅ KPI prioritário: reduzir turnover de 28% para 20% em 18 meses

---

## Entregáveis da Fase 1

| Entregável | Formato | Status |
|---|---|---|
| Relatório de Diagnóstico (90 páginas) | PDF + PPTX executivo | ✅ Entregue |
| Gap Analysis de Competências | Excel + visualizações | ✅ Entregue |
| Análise de Dados de RH | Dashboard Power BI | ✅ Entregue |
| Business Case com ROI | PPTX 20 slides | ✅ Entregue |
| Inventário de Conteúdos | Excel categorizado | ✅ Entregue |
| Aprovação do C-Level | Ata de reunião assinada | ✅ Aprovado |

---

→ **Próxima fase:** [Projeto Pedagógico e Arquitetura da UC](02-PROJETO-PEDAGOGICO.md)
