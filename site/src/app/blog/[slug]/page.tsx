import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/posts";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post não encontrado | Educa Com Talento",
    };
  }

  return {
    title: `${post.title} | Blog Educa Com Talento`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="gradient-green py-20 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-green-800 hover:text-green-900 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <span className="text-green-700">{new Date(post.date).toLocaleDateString("pt-BR")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-green-800">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-green-300">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <p className="font-semibold text-green-900">{post.author}</p>
              <p className="text-green-700 text-sm">Equipe Educa com Talento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Embed (se for vídeo) */}
      {post.category === "video" && post.videoUrl && (
        <section className="py-8 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video">
              <iframe
                src={post.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div 
              className="prose prose-lg prose-green max-w-none
                prose-headings:text-green-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-green-800
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
              "
            >
              {post.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={index}>{paragraph.replace("## ", "")}</h2>;
                } else if (paragraph.startsWith("### ")) {
                  return <h3 key={index}>{paragraph.replace("### ", "")}</h3>;
                } else if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <p key={index}><strong>{paragraph.replace(/\*\*/g, "")}</strong></p>;
                } else if (paragraph.startsWith("- ")) {
                  return <li key={index}>{paragraph.replace("- ", "")}</li>;
                } else if (paragraph.startsWith("`") && paragraph.endsWith("`")) {
                  return <code key={index}>{paragraph.replace(/`/g, "")}</code>;
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </article>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Compartilhe este artigo</h3>
            <div className="flex gap-4">
              <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
              <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>
              <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[relatedPost.category]}`}>
                      {categoryLabels[relatedPost.category]}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 mt-3 mb-2">{relatedPost.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
