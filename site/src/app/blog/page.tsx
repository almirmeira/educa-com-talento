import Link from "next/link";
import { posts, Post } from "@/data/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Educa Com Talento",
  description: "Artigos, dicas e vídeos sobre educação, produtividade e técnicas de estudo.",
};

function PostCard({ post }: { post: Post }) {
  const categoryColors = {
    artigo: "bg-blue-100 text-blue-800",
    video: "bg-red-100 text-red-800",
    dica: "bg-green-100 text-green-800",
  };

  const categoryLabels = {
    artigo: "Artigo",
    video: "Vídeo",
    dica: "Dica Rápida",
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
        {post.category === "video" ? (
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        ) : (
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
          <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString("pt-BR")}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-green-700 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-1"
        >
          Ler mais
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-green py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Blog Educa com Talento
          </h1>
          <p className="text-xl text-green-800 max-w-2xl mx-auto">
            Artigos, dicas e vídeos para impulsionar seus estudos e desenvolvimento pessoal.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 border-b bg-white sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 rounded-full bg-green-700 text-white font-medium">
              Todos
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Artigos
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Vídeos
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Dicas Rápidas
            </button>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Receba Conteúdo Exclusivo
          </h2>
          <p className="text-green-100 mb-8">
            Cadastre-se e receba dicas, artigos e materiais gratuitos diretamente no seu email.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              type="submit"
              className="bg-green-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
