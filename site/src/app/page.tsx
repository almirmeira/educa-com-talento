import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="inicio" className="min-h-screen gradient-green flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-6">
                Educa Com Talento
              </h1>
              <p className="text-2xl md:text-3xl text-green-800 font-semibold mb-6">
                Transformando conhecimento em resultados
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Bem-vindo à nossa consultoria educacional especializada, onde unimos
                experiência e inovação para desenvolver soluções que elevam o potencial
                de instituições de ensino e empresas em todo o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#servicos"
                  className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-center hover:bg-green-800 transition-colors shadow-lg"
                >
                  Nossos Serviços
                </Link>
                <Link
                  href="#cursos"
                  className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-center hover:bg-green-50 transition-colors shadow-lg border-2 border-green-700"
                >
                  Cursos Online
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Educa Com Talento"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Quem Somos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Na Educa Com Talento, acreditamos que a educação de qualidade é a base
              para transformar potencial em realizações concretas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-green-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Especialistas em Educação
              </h3>
              <p className="text-gray-600">
                Somos uma equipe de profissionais com vasta experiência em instituições
                de ensino e ambientes corporativos, dedicados a criar soluções
                educacionais que realmente funcionam.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Metodologias Inovadoras
              </h3>
              <p className="text-gray-600">
                Utilizamos abordagens pedagógicas baseadas em evidências científicas,
                combinando o melhor da tradição educacional com técnicas contemporâneas
                e tecnologia.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-green-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Foco no Desenvolvimento
              </h3>
              <p className="text-gray-600">
                Priorizamos o crescimento integral das pessoas, equilibrando competências
                técnicas e habilidades socioemocionais para formar profissionais completos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologias */}
      <section id="metodologias" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Nossas Metodologias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utilizamos abordagens pedagógicas baseadas em evidências científicas
              para maximizar o aprendizado e desenvolver a autonomia dos estudantes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Aprendizagem Ativa */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-900">
                  Aprendizagem Ativa
                </h3>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <p className="text-lg text-green-800 font-semibold mb-2">
                  Aprender nao e assistir. E agir.
                </p>
                <p className="text-gray-700">
                  Estudos mostram que estudantes retêm <span className="font-bold text-green-700">até 90%</span> do
                  conteúdo quando ensinam outras pessoas ou aplicam o que aprenderam.
                  Mas quando apenas assistem a uma aula expositiva, esse número cai para
                  <span className="font-bold text-red-600"> menos de 10%</span>.
                </p>
              </div>

              <p className="text-gray-600 mb-6">
                A aprendizagem ativa coloca o estudante como protagonista, transformando
                o aprendizado em algo vivo, prático e envolvente.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-green-800">Técnicas que utilizamos:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Discussões em grupo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Problemas reais</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Estudo de casos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Sala de aula invertida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metacognição */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-900">
                  Metacognição
                </h3>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <p className="text-lg text-green-800 font-semibold mb-2">
                  Aprender a aprender
                </p>
                <p className="text-gray-700">
                  A metacognição é a capacidade de <span className="font-bold text-green-700">pensar sobre o próprio pensamento</span>.
                  Quando o aluno entende como aprende, ele estuda melhor, corrige erros
                  e ganha autonomia. E o melhor: isso pode ser ensinado.
                </p>
              </div>

              <p className="text-gray-600 mb-6">
                Estudantes com habilidades metacognitivas são mais independentes,
                confiantes e preparados para os desafios da vida acadêmica e profissional.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-green-800">Benefícios comprovados:</p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Tomam decisões de estudo mais eficazes</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Se recuperam mais rápido de dificuldades</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Desenvolvem mais autoconfiança</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Identificam quando não estão aprendendo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destaque */}
          <div className="mt-12 bg-green-700 rounded-3xl p-8 md:p-12 text-white text-center">
            <p className="text-2xl md:text-3xl font-bold mb-4">
              Sua instituição está preparando estudantes para memorizar... ou para pensar?
            </p>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              O mundo mudou. O mercado mudou. A forma de aprender também precisa mudar.
              Quando o aluno participa, experimenta, reflete e constrói, o aprendizado ganha profundidade.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              O que Fazemos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua instituição com soluções educacionais personalizadas e
              inovadoras. Estamos prontos para ser seu parceiro nessa jornada!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Serviço 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-green-600">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Produção de Material Didático
              </h3>
              <p className="text-gray-600 mb-4">
                Desenvolvemos conteúdos educacionais claros, visualmente atrativos e
                perfeitamente adaptados ao seu público-alvo, facilitando o aprendizado
                e aumentando o engajamento.
              </p>
              <p className="text-gray-500 text-sm">
                Nossos materiais combinam rigor acadêmico com design moderno e acessibilidade.
              </p>
            </div>

            {/* Serviço 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-green-600">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Orientação de Carreira
              </h3>
              <p className="text-gray-600 mb-4">
                Oferecemos avaliação detalhada de perfil e interesses, ajudando estudantes
                e profissionais a identificarem seus pontos fortes e oportunidades de
                crescimento.
              </p>
              <p className="text-gray-500 text-sm">
                Construímos juntos um planejamento personalizado de trajetória acadêmica
                e profissional com metas claras.
              </p>
            </div>

            {/* Serviço 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-green-600">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Criação de Cursos Específicos
              </h3>
              <p className="text-gray-600 mb-4">
                Desenvolvemos capacitações sob medida que atendem às necessidades
                específicas da sua instituição ou empresa, com foco em resultados tangíveis.
              </p>
              <p className="text-gray-500 text-sm">
                Utilizamos metodologias ativas que promovem o protagonismo dos
                participantes no processo de aprendizagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Online */}
      <section id="cursos" className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cursos Online
            </h2>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Acesse nossa plataforma de ensino e desenvolva novas competências
              com cursos de alta qualidade, disponíveis 24 horas por dia.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Plataforma Moodle - Em Breve!
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cursos desenvolvidos por especialistas em educação</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Metodologias ativas e conteúdo interativo</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certificados reconhecidos pelo mercado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Suporte pedagógico personalizado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Acesso flexível - estude no seu ritmo</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-green-800 rounded-2xl p-8">
                  <svg className="w-24 h-24 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-green-200 mb-4">
                    Nossa plataforma de cursos online está em desenvolvimento.
                  </p>
                  <Link
                    href="#contato"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-500 transition-colors"
                  >
                    Seja avisado do lançamento
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos prontos para ajudar sua instituição a alcançar novos patamares
              de excelência educacional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="material">Produção de Material Didático</option>
                    <option value="carreira">Orientação de Carreira</option>
                    <option value="cursos">Criação de Cursos</option>
                    <option value="moodle">Cursos Online (Moodle)</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-colors shadow-lg"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-8">
              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-green-900 mb-6">
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">E-mail</p>
                      <p className="text-gray-600">contato@educacomtalento.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Telefone</p>
                      <p className="text-gray-600">(11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Localização</p>
                      <p className="text-gray-600">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Horário de Atendimento
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>08:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábado</span>
                    <span>09:00 - 13:00</span>
                  </p>
                  <p className="flex justify-between text-green-200">
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
            Pronto para transformar sua educação?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Entre em contato conosco e descubra como podemos ajudar sua instituição
            a alcançar resultados extraordinários.
          </p>
          <Link
            href="#contato"
            className="inline-block bg-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors shadow-lg"
          >
            Comece Agora
          </Link>
        </div>
      </section>
    </>
  )
}
