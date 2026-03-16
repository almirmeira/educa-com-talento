# Aula 15 — Anki na Prática

---

## Informações da Aula

| Campo | Detalhe |
|-------|---------|
| **Módulo** | 3 — Técnicas Fundamentais de Alta Eficácia |
| **Aula** | 15 de 08 (Módulo 3) |
| **Duração estimada** | 20 minutos |
| **Nível** | Intermediário |
| **Formato** | Videoaula com demonstração de software |
| **Objetivos** | Instalar e configurar o Anki; criar decks e cartões; entender as configurações principais; estabelecer rotina diária de revisão; conhecer alternativas ao Anki |

---

## Roteiro da Aula

| Parte | Tempo | Conteúdo |
|-------|-------|---------|
| Abertura | 2 min | Por que o Anki é o software de estudos mais poderoso do mundo |
| Parte 1 | 4 min | Download, instalação e primeiros passos |
| Parte 2 | 5 min | Criando decks e cartões — interface e configurações |
| Parte 3 | 4 min | Estratégias de uso, add-ons e alternativas |
| Encerramento | 3 min | Exercício prático + próxima aula |

---

## Narração em Primeira Pessoa

### Abertura

Vou te apresentar o software que alunos de medicina ao redor do mundo usam para memorizar dezenas de milhares de termos médicos, que poliglotas usam para aprender idiomas em meses, e que estudantes de concursos usam para manter todo o conteúdo ativo na memória.

Seu nome é **Anki**. É gratuito para desktop e Android. E se você usar direito, vai transformar sua capacidade de reter informação de forma permanente.

Ele não é bonito. Não tem interface sofisticada. Mas por baixo de uma aparência simples existe um motor científico poderoso: o algoritmo SM-2 de Piotr Wozniak que vimos nas últimas duas aulas, implementado de forma brilhante.

Nesta aula, você vai instalar, configurar, criar seus primeiros cartões e entender como fazer do Anki um hábito diário que funciona.

---

### Parte 1: Instalação e Primeiros Passos

**Onde baixar:**

```
┌────────────────────────────────────────────────────────────┐
│                  ONDE BAIXAR O ANKI                        │
│                                                            │
│  Desktop (Windows/Mac/Linux):  apps.ankiweb.net            │
│  Android:                      Google Play (gratuito)      │
│  iOS:                          App Store (US$ 24,99)       │
│  Web (AnkiWeb):                ankiweb.net (grátis)        │
│                                                            │
│  Sincronização gratuita via AnkiWeb entre todos           │
│  os dispositivos                                           │
└────────────────────────────────────────────────────────────┘
```

Após instalar no desktop, crie uma conta gratuita no **ankiweb.net**. Isso permite sincronizar seus decks entre todos os seus dispositivos — você cria cartões no computador, revisa no celular no ônibus.

**A interface inicial:**

Quando você abrir o Anki pela primeira vez, vai ver três elementos principais:
- **Decks**: suas coleções de cartões organizadas por tema
- **Botão "Adicionar"**: para criar novos cartões
- **Botão "Estudar agora"**: para iniciar a sessão de revisão

---

### Parte 2: Criando Decks e Cartões

**Criando seu primeiro deck:**

Clique em "Criar Deck" na tela inicial. Dê um nome descritivo: "Inglês — Vocabulário Técnico", "Concurso — Direito Constitucional", "Neurociência — Conceitos Chave".

Você pode criar sub-decks usando dois pontos: "Concurso::Direito Constitucional", "Concurso::Direito Administrativo". Eles aparecem aninhados.

**Criando cartões:**

Clique em "Adicionar". Você verá dois campos: "Frente" e "Verso".

- **Frente**: sua pergunta
- **Verso**: sua resposta + contexto adicional se necessário

Lembre-se do Princípio da Informação Mínima — uma ideia por cartão.

**Tipos de nota importantes:**

```
┌────────────────────────────────────────────────────────────┐
│              TIPOS DE NOTA NO ANKI                         │
│                                                            │
│  Básico:         frente → verso                            │
│  Básico+Reverso: gera dois cartões (frente↔verso)         │
│  Cloze:          texto com {{c1::lacuna}} para preencher   │
│  Básico Opcional:versão simplificada do reverso            │
└────────────────────────────────────────────────────────────┘
```

O tipo **Cloze** é especialmente útil. Você digita:

> "A repetição espaçada funciona porque {{c1::revisar quando você já esqueceu um pouco}} é mais eficaz do que reler."

O Anki vai gerar um cartão que mostra a frase com a lacuna, e você testa se lembra o que deve preencher.

---

**Entendendo a sessão de revisão:**

Quando você clica para estudar um deck, o Anki mostra a frente do cartão. Você tenta lembrar a resposta. Clica em "Mostrar Resposta". Aí avalia sua performance com os botões:

```
┌────────────────────────────────────────────────────────────┐
│         BOTÕES DE AVALIAÇÃO DO ANKI                        │
│                                                            │
│  [Novamente]  → não lembrei nada / lembrei errado         │
│  [Difícil]    → lembrei com muito esforço                  │
│  [Bom]        → lembrei com esforço moderado              │
│  [Fácil]      → lembrei sem esforço algum                 │
│                                                            │
│  O Anki calcula o próximo intervalo com base na sua        │
│  resposta. "Novamente" = ver de novo hoje.                 │
│  "Fácil" = próxima revisão em semanas ou meses.           │
└────────────────────────────────────────────────────────────┘
```

**Seja honesto consigo mesmo.** Se você precisou de dica ou ficou em dúvida, não marque "Fácil". A honestidade com os botões é o que mantém o algoritmo calibrado para você.

---

**Configurações importantes:**

Clique na engrenagem ao lado do deck → "Opções":

- **Novos cartões por dia**: comece com 10 a 20. Não seja ambicioso demais no início.
- **Máximo de revisões por dia**: deixe em 200 ou mais — as revisões não devem ser limitadas.
- **Ordem de aprendizado**: "Ordem aleatória" (evita correlações falsas de posição)

Uma dica crucial: **não crie mais cartões do que consegue revisar**. A grande armadilha do Anki é criar centenas de cartões e deixar a pilha de revisões crescer. Quando você abre o app e vê 500 revisões pendentes, a vontade de estudar vai embora.

Comece pequeno. 10 cartões novos por dia, revise os pendentes todo dia. Isso funciona.

---

### Parte 3: Add-ons, Estratégias e Alternativas

**Add-ons úteis para estudantes brasileiros:**

Acesse: Ferramentas → Add-ons → Obter Add-ons

| Add-on | Função |
|--------|--------|
| **Image Occlusion Enhanced** | Cobre partes de imagens (perfeito para anatomia, mapas) |
| **Review Heatmap** | Mostra sua frequência de estudo em calendário visual |
| **Heatmap** | Histograma de revisões — motiva consistência |
| **Frozen Fields** | Congela campos ao adicionar vários cartões seguidos |
| **AnkiConnect** | API para integrar com outros apps |

**Estratégia de uso que funciona:**

```
┌────────────────────────────────────────────────────────────┐
│           ROTINA ANKI — EXEMPLO DE USO DIÁRIO             │
│                                                            │
│  Manhã (10 min):  revisões do dia — todos os decks        │
│  Tarde (15 min):  adicionar novos cartões do estudo        │
│  (se necessário)  do dia                                  │
│                                                            │
│  Total: 10-25 min/dia para manter TUDO ativo              │
│                                                            │
│  ⚠ Nunca pule um dia de revisão — a pilha cresce          │
│    exponencialmente e desmotiva                            │
└────────────────────────────────────────────────────────────┘
```

**Como organizar seus decks:**

- Um deck por disciplina/área, não um deck gigante
- Use tags para categorizar cartões dentro dos decks (Ex: tag "difícil", "prioridade", "cap3")
- Compartilhe decks com colegas — o AnkiWeb tem uma biblioteca enorme de decks prontos

**Alternativas gratuitas ao Anki:**

| Software | Pontos Fortes | Limitação |
|----------|--------------|-----------|
| **Quizlet** | Interface moderna, colaborativo | Algoritmo de espaçamento inferior |
| **RemNote** | Integra notas + flashcards | Curva de aprendizado |
| **Logseq** | Open-source, privado | Menos intuitivo |
| **Supermemo** | O original de Wozniak | Interface antiquada, pago |

Para a maioria das pessoas, o Anki com as configurações certas é imbatível. Mas se você tiver resistência à interface, o Quizlet é uma boa porta de entrada.

---

### Anki e Life Long Learning

O que me impressiona no Anki — e que poucos percebem — é o que ele representa no contexto do **Life Long Learning**.

Com o Anki, você pode construir ao longo de anos um **banco de conhecimento pessoal** que se mantém vivo. Cada nova área que você estuda, você adiciona aos seus decks. Os algoritmos garantem que o conhecimento antigo não se perca enquanto você adiciona o novo.

Imagine ter estudado programação há 5 anos, e ainda conseguir responder questões sobre os fundamentos porque fez revisões espaçadas ao longo do tempo. Isso é o que o Anki viabiliza.

É como construir uma biblioteca mental que nunca perde os livros — desde que você continue fazendo as revisões diárias.

---

### Encerramento

Para resumir:

O **Anki** implementa o algoritmo SM-2 de repetição espaçada de forma automática e inteligente. É gratuito no desktop e Android.

O segredo do sucesso é: **criar cartões com qualidade** (Princípio da Informação Mínima), **limitar cartões novos** (10-20/dia), e **revisar todos os dias** (nunca deixar a pilha crescer).

Seu exercício de hoje é criar um deck real com 20 cartões e fazer a primeira rodada de revisão. Não é opcional — é o que transforma essa aula de teoria em habilidade.

Na próxima aula, vamos aprender **interleaving** — o paradoxo que vai transformar sua forma de organizar sessões de estudo.

---

## Exercício Prático

**Título**: Seu Primeiro Deck Anki Funcional

**Instruções**:

1. Baixe e instale o Anki (apps.ankiweb.net)
2. Crie uma conta no AnkiWeb e configure a sincronização
3. Crie um deck com o nome de um tema que está estudando agora
4. Adicione 20 cartões seguindo os princípios da Aula 14:
   - Uma ideia por cartão
   - Mix de tipos: pelo menos 5 básicos, 5 cloze, 5 básico+reverso
   - Inclua imagens em pelo menos 3 cartões
5. Configure o deck: 10 novos cartões por dia, ordem aleatória
6. Faça a primeira sessão de estudo completa dos 20 cartões
7. Anote: como você se sentiu usando os botões de avaliação? Foi fácil ser honesto?

**Reflexão**: O que você percebeu sobre o que realmente sabe vs. o que achava que sabia?

**Tempo estimado**: 30 a 45 minutos

---

## Quiz de Retrieval

*Feche a aula e responda sem consultar.*

**Pergunta 1**: O Anki é gratuito em qual plataforma que não o desktop? Existe alguma versão paga?

**Pergunta 2**: O que acontece quando você clica "Novamente" no Anki? E quando clica "Fácil"?

**Pergunta 3**: Qual é a armadilha mais comum de quem começa a usar o Anki e acaba abandonando?

**Pergunta 4**: O que é o tipo de nota "Cloze" no Anki? Dê um exemplo.

**Pergunta 5**: Cite 2 alternativas gratuitas ao Anki e uma diferença importante em relação a ele.

---

### Gabarito

1. Gratuito no **desktop e Android**. A versão iOS (iPhone) custa US$ 24,99 na App Store. A versão web (AnkiWeb) é gratuita para revisão.

2. **"Novamente"** → o cartão volta para ser revisado ainda nesta sessão (intervalo mínimo). **"Fácil"** → o algoritmo calcula um intervalo longo, de semanas ou meses, assumindo que a memória está consolidada.

3. Criar **cartões demais sem revisar todos os dias**. A pilha de revisões pendentes cresce exponencialmente e se torna tão assustadora que o aluno abandona o app. Solução: limitar novos cartões (10-20/dia) e revisar sem falta todos os dias.

4. Cloze é um tipo de cartão com **lacuna** no texto. Exemplo: "O algoritmo SM-2 foi criado por {{c1::Piotr Wozniak}}" gera um cartão que mostra "O algoritmo SM-2 foi criado por ___" e você testa se lembra o nome.

5. Quaisquer 2 de: **Quizlet** (interface mais bonita mas algoritmo de espaçamento inferior ao Anki), **RemNote** (integra notas e flashcards mas curva de aprendizado maior), **Logseq** (open-source e privado mas menos intuitivo), **Supermemo** (o original mas interface antiquada e pago).

---

## Leitura Recomendada

- **ankiweb.net/shared/decks** — biblioteca de decks prontos criados pela comunidade
- **"Fluent Forever"** — Gabriel Wyner — capítulo sobre uso de Anki para idiomas
- **docs.ankiweb.net** — documentação oficial completa do Anki (em inglês)
- Canal **Pensativo no YouTube** — tutoriais de Anki em português

---

*Aula 15 — Módulo 3 — Curso Aprender a Aprender | Educa com Talento*
