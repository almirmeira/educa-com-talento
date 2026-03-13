# Configuração do AVA — Moodle 4.1 | MBA em Transformação Digital

---

## Arquitetura do Ambiente Virtual de Aprendizagem

### Visão Geral da Implementação

O IDD já possuía Moodle 4.1 hospedado em servidor próprio. A Educa com Talento realizou a **configuração pedagógica completa** — não a implantação técnica — criando a estrutura de cursos, templates, plugins e integrações que suportam a experiência premium do MBA-TDI.

---

## 1. Estrutura de Cursos no Moodle

### 1.1 Hierarquia de Categorias

```
MOODLE IDD
└── MBA — Transformação Digital e Inovação Empresarial
    ├── TURMA FEV/2026
    │   ├── [META-CURSO] Ambiente da Turma (informações gerais, fórum geral, Teams)
    │   ├── D01 — Transformação Digital: Fundamentos
    │   ├── D02 — Estratégia Digital e Modelos de Negócio
    │   ├── D03 — Gestão de Dados e Analytics
    │   │   ... [demais disciplinas]
    │   └── TCC — Projeto de Transformação Digital
    ├── TURMA AGO/2026
    │   └── [mesma estrutura]
    └── COORDENAÇÃO (oculto para alunos)
        ├── Templates de disciplinas
        ├── Banco de questões compartilhado
        └── Relatórios consolidados
```

### 1.2 Template Padrão de Disciplina (30h)

Cada disciplina segue um template idêntico, com 4 seções correspondentes às 4 semanas:

**Seção 0 — Apresentação da Disciplina:**
- Vídeo de boas-vindas do professor (5 min)
- Guia da Disciplina (PDF com objetivos, cronograma, critérios de avaliação, rubrica)
- Problema Central da Disciplina (contexto do PBL)
- Fórum: "Diga o que você já sabe sobre este tema"

**Seção 1 — Semana 1: [Título temático]**
- Videoaula 1 (Panopto embed)
- Texto-base (PDF com realce e anotações)
- Videoaula 2 (Panopto embed)
- H5P Activity (tipo varia por disciplina)
- Podcast (arquivo de áudio ou embed Spotify)
- Fórum de Discussão 1 (nota integrada)
- Quiz Formativo 1 (sem nota)

**Seção 2 — Semana 2: [Título temático]**
- Videoaula 3
- Case Real (PDF + questões)
- H5P Scenario ou Branching
- Live Gravada (Panopto)
- Fórum de Discussão 2
- [ATRIBUIÇÃO DO DESAFIO EM GRUPO — prazo visível]

**Seção 3 — Semana 3: [Título temático]**
- Videoaulas 4 e 5
- Tutorial interativo (H5P)
- Texto complementar
- Fórum de dúvidas
- Quiz Formativo 2

**Seção 4 — Semana 4: Síntese e Avaliação**
- Videoaula de síntese
- [ENTREGA DO DESAFIO EM GRUPO — assignment]
- Live Final (link para Teams / gravação posterior)
- Avaliação Somativa (Quiz com questões + Essay)
- Fórum de Reflexão Final
- Pesquisa de NPS (Questionnaire Moodle)

---

## 2. Plugins Instalados e Configurados

| Plugin | Versão | Função no MBA-TDI |
|---|---|---|
| **H5P** (nativo Moodle 4.1) | 4.1 | Atividades interativas de todos os tipos |
| **Panopto** | 2024.12 | Embed de videoaulas com analytics |
| **BigBlueButton** | 3.0 | Lives síncronas opcionais (substituto caso Teams não funcione) |
| **Certificate** | v3 | Certificados personalizados automáticos |
| **Open Badges (BadgeOS)** | 2.1 | Emissão de badges por conclusão |
| **Questionnaire** | 3.3 | NPS pós-disciplina e pesquisas de feedback |
| **Scheduler** | 4.1 | Agendamento de mentorias individuais |
| **Attendance** | 4.1 | Registro de presença nas lives síncronas |
| **Analytics (Moodle nativo)** | 4.1 | Predição de risco de abandono (ML nativo) |
| **Completion Progress** | 2024 | Barra de progresso visual para o aluno |
| **Boost Theme (customizado)** | | Identidade visual do MBA-TDI |

---

## 3. Configuração de Competência de Conclusão

### 3.1 Critérios de Conclusão por Disciplina

Configuração no Moodle (Activity Completion + Course Completion):

| Atividade | Critério de Conclusão |
|---|---|
| Videoaulas | Visualizar 80% do vídeo (rastreado via Panopto xAPI) |
| Texto-base | Marcar como lido (manual pelo aluno) |
| Fóruns 1, 2, 3 | Pelo menos 1 postagem + 1 resposta a colega |
| Quizzes Formativos | Completar o quiz (qualquer nota — sem mínimo) |
| H5P Activities | Score mínimo de 60% |
| Desafio em Grupo | Entrega do arquivo até a data limite |
| Avaliação Somativa | Nota mínima de 6,0 |
| Fórum Final | Pelo menos 1 postagem |
| NPS | Resposta ao questionário |

**Conclusão da Disciplina:** Todas as atividades concluídas conforme acima + nota final ≥ 6,0

### 3.2 Critérios de Conclusão do MBA

- 11 disciplinas aprovadas (nota ≥ 6,0 em cada)
- TCC aprovado pela banca (nota ≥ 7,0)
- Frequência ≥ 75% nas lives (via plugin Attendance)
- **Conclusão automática no Moodle → certificado emitido automaticamente**

---

## 4. Identidade Visual Customizada

### 4.1 Tema Boost Customizado

Paleta de cores do MBA-TDI:
- **Primária:** #1A3C5E (azul marinho tecnológico)
- **Secundária:** #00B4D8 (ciano digital)
- **Destaque:** #FF6B35 (laranja inovação)
- **Fundo:** #F8F9FA (cinza claro neutro)
- **Texto:** #2D3436 (quase preto, boa legibilidade)

Customizações no Boost:
- Logo do MBA-TDI no header (não apenas logo do IDD)
- Banner personalizado por disciplina (imagem temática)
- Ícones de navegação customizados
- Barra de progresso visível no dashboard do aluno
- Footer com contato da coordenação e links rápidos

### 4.2 Dashboard Personalizado do Aluno

O dashboard padrão do Moodle foi customizado com blocos:
1. **Meu Progresso no MBA** — trilha visual de todas as disciplinas
2. **Próximas Atividades** — calendário com prazos próximos
3. **Meus Badges** — badges obtidos e próximos a obter
4. **Lives e Eventos** — próximas lives com link de acesso
5. **Anúncios Importantes** — comunicados da coordenação
6. **Contato Rápido** — link para tutor e canal no Teams

---

## 5. Integrações

### 5.1 Panopto (Videoaulas)

**Fluxo de publicação:**
1. Professor grava no Panopto (ou envia MP4 para upload)
2. Panopto processa (compressão, legendas automáticas via IA)
3. DI revisa legendas e adiciona capítulos (timestamps)
4. Panopto embed inserido no Moodle via LTI
5. Analytics de visualização disponíveis para o professor no Panopto (tempo médio, % concluíram, momentos mais rebobinados)
6. Dados de conclusão enviados ao Moodle via xAPI (atividade marcada como concluída quando 80% visualizado)

### 5.2 Microsoft Teams

**Canais por turma:**
```
MBA-TDI FEV2026
├── 📢 Anúncios (só coordenação posta)
├── 💬 Geral (conversas informais, networking)
├── 🎓 Suporte Técnico
├── 📚 D01 - Transformação Digital
├── 📚 D02 - Estratégia Digital
│   ... [um canal por disciplina]
├── 🤝 TCC - Grupo A
├── 🤝 TCC - Grupo B
└── 🌐 Alumni Network (após conclusão)
```

**Regras de uso:**
- Dúvidas sobre conteúdo: no Moodle (fórum) — rastreável e respondido por todos
- Dúvidas operacionais: Teams canal Suporte
- Interações de networking: Teams canal Geral
- Mentorias: Zoom agendado via plugin Scheduler no Moodle

### 5.3 Biblioteca Virtual Minha Biblioteca

- Acesso integrado via autenticação Moodle (SSO)
- Link direto nos materiais das disciplinas para títulos recomendados
- 9.000+ títulos em português e inglês
- Acesso disponível durante todo o período do MBA + 6 meses após

---

## 6. Gestão de Turmas e Usuários

### 6.1 Matrículas

- Integração manual via importação CSV (sem integração automática com sistema acadêmico do IDD no MVP)
- Alunos recebem e-mail automático do Moodle com link de acesso + senha temporária
- Tutoriais de acesso enviados 3 dias antes do início de cada disciplina

### 6.2 Perfis de Acesso

| Perfil | O que pode fazer | Quem tem |
|---|---|---|
| Aluno | Acessar conteúdos, participar de fóruns, enviar atividades | Todos os matriculados |
| Tutor | Corrigir atividades, responder fóruns, acessar notas | 1 por turma de 50 alunos |
| Professor | Editar conteúdo de suas disciplinas, ver analytics | NDE + professores por disciplina |
| Coordenador | Acesso total ao MBA, relatórios consolidados | Coord. do curso |
| Admin LMS | Acesso total ao Moodle | Equipe técnica IDD |

### 6.3 Relatórios Configurados para a Coordenação

| Relatório | Frequência | Destinatário | Conteúdo |
|---|---|---|---|
| Engajamento semanal | Segunda-feira | Coord. + tutores | Alunos sem acesso há 5+ dias |
| Conclusão por disciplina | Ao fim de cada disciplina | Coord. | % concluíram, média de notas, NPS |
| Predição de risco de abandono | Mensal | Coord. + tutores | Alunos em risco (ML nativo Moodle 4.1) |
| Relatório financeiro/pedagógico | Mensal | Diretoria IDD | Evasão, NPS médio, horas de estudo médias |

---

## 7. Acessibilidade (WCAG 2.2)

| Requisito | Implementação |
|---|---|
| Contraste de cores | Relação mínima 4.5:1 verificada com Colour Contrast Analyser |
| Legendas em vídeos | CC revisada manualmente em todas as videoaulas |
| Descrição de imagens | Alt text obrigatório em todas as imagens nos textos |
| Navegação por teclado | Tema Boost padrão compatível; H5P verificado |
| Leitores de tela | Testado com NVDA + Firefox |
| Texto redimensionável | Zoom até 200% sem perda de funcionalidade |

---

*Ver também: [Tutoria, Avaliação e Qualidade](05-TUTORIA-AVALIACAO.md)*
