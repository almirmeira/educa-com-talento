export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "artigo" | "video" | "dica";
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
}

// Posts de exemplo - em produção, isso viria de um CMS ou API
export const posts: Post[] = [
  {
    id: "1",
    slug: "como-melhorar-foco-nos-estudos",
    title: "Como Melhorar o Foco nos Estudos: 5 Técnicas Comprovadas",
    excerpt: "Descubra técnicas baseadas em ciência para aumentar sua concentração e produtividade durante os estudos.",
    content: `
## Introdução

O foco é uma das habilidades mais importantes para o sucesso nos estudos. Em um mundo cheio de distrações, aprender a concentrar-se tornou-se essencial.

## 1. Técnica Pomodoro

A técnica Pomodoro consiste em estudar por 25 minutos seguidos, fazer uma pausa de 5 minutos, e repetir o ciclo. Após 4 ciclos, faça uma pausa maior de 15-30 minutos.

**Como aplicar:**
- Defina um timer para 25 minutos
- Estude sem interrupções
- Quando o timer tocar, faça uma pausa de 5 minutos
- Repita o processo

## 2. Eliminação de Distrações

Antes de começar a estudar:
- Coloque o celular em modo avião
- Feche abas desnecessárias no navegador
- Avise as pessoas ao seu redor

## 3. Ambiente de Estudo

Crie um espaço dedicado exclusivamente aos estudos:
- Boa iluminação
- Temperatura agradável
- Mesa e cadeira confortáveis
- Materiais organizados

## 4. Alimentação e Hidratação

Seu cérebro precisa de combustível:
- Beba água regularmente
- Evite refeições pesadas antes de estudar
- Consuma alimentos ricos em ômega-3

## 5. Sono de Qualidade

O sono é fundamental para a consolidação da memória:
- Durma 7-8 horas por noite
- Mantenha horários regulares
- Evite telas antes de dormir

## Conclusão

Implementar essas técnicas requer prática e consistência. Comece com uma ou duas e vá adicionando as outras gradualmente.
    `,
    author: "Equipe Educa com Talento",
    date: "2024-12-15",
    category: "artigo",
    imageUrl: "/blog/foco-estudos.jpg",
    tags: ["foco", "produtividade", "estudos", "técnicas"]
  },
  {
    id: "2",
    slug: "tecnica-feynman-aprendizado",
    title: "Técnica Feynman: Aprenda Qualquer Coisa de Forma Simples",
    excerpt: "Conheça o método criado pelo físico Richard Feynman para aprender e reter conhecimento de forma eficiente.",
    content: `
## O que é a Técnica Feynman?

A Técnica Feynman foi desenvolvida pelo físico e ganhador do Nobel Richard Feynman. Ela se baseia na ideia de que a melhor forma de aprender algo é ser capaz de explicá-lo de forma simples.

## Os 4 Passos da Técnica

### Passo 1: Escolha um Conceito
Selecione o tema que deseja aprender e escreva o título em uma folha de papel.

### Passo 2: Explique Como se Fosse Ensinar uma Criança
Escreva uma explicação do conceito usando linguagem simples, como se estivesse ensinando a uma criança de 12 anos.

### Passo 3: Identifique as Lacunas
Quando não conseguir explicar algo de forma simples, significa que há uma lacuna no seu conhecimento. Volte ao material de estudo.

### Passo 4: Revise e Simplifique
Refine sua explicação, removendo jargões e tornando-a cada vez mais clara.

## Por que Funciona?

- Força você a realmente entender o assunto
- Expõe lacunas no conhecimento
- Melhora a retenção de longo prazo
- Desenvolve habilidades de comunicação

## Exemplo Prático

**Tema:** Fotossíntese

**Explicação simples:** As plantas são como pequenas fábricas que produzem sua própria comida. Elas pegam a luz do sol, água do solo e um gás chamado CO2 do ar, e transformam tudo isso em açúcar (comida) e oxigênio.

## Conclusão

A Técnica Feynman é poderosa porque inverte a lógica tradicional de aprendizado. Em vez de apenas consumir informação, você se torna um transmissor de conhecimento.
    `,
    author: "Equipe Educa com Talento",
    date: "2024-12-14",
    category: "artigo",
    imageUrl: "/blog/feynman.jpg",
    tags: ["aprendizado", "técnica feynman", "estudos", "memorização"]
  },
  {
    id: "3",
    slug: "dica-rapida-organizacao-estudos",
    title: "Dica Rápida: Como Organizar seu Material de Estudos",
    excerpt: "Organize seus materiais de forma eficiente e nunca mais perca tempo procurando anotações.",
    content: `
## Dica Rápida de Organização

Uma organização eficiente pode economizar horas do seu tempo de estudo. Aqui está um sistema simples e eficaz.

## O Sistema de Pastas

1. **Crie uma pasta para cada matéria**
2. **Dentro de cada pasta, crie subpastas:**
   - Anotações
   - Exercícios
   - Resumos
   - Materiais de Apoio

## Nomenclatura de Arquivos

Use um padrão consistente:
\`[Data]-[Matéria]-[Tema].extensão\`

Exemplo: \`2024-12-15-Matematica-Derivadas.pdf\`

## Ferramentas Úteis

- **Notion** - Para anotações e organização
- **Google Drive** - Para backup na nuvem
- **Anki** - Para revisão espaçada

## Conclusão

Gaste 10 minutos organizando hoje e economize horas procurando amanhã\!
    `,
    author: "Equipe Educa com Talento",
    date: "2024-12-13",
    category: "dica",
    imageUrl: "/blog/organizacao.jpg",
    tags: ["organização", "produtividade", "dicas"]
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: Post["category"]): Post[] {
  return posts.filter(post => post.category === category);
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
  return Array.from(tagsSet);
}
