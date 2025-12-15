import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Educa Com Talento | Transformando conhecimento em resultados',
  description: 'Consultoria educacional especializada em desenvolver soluções que elevam o potencial de instituições de ensino e empresas em todo o Brasil.',
  keywords: 'educação, consultoria educacional, material didático, orientação de carreira, cursos, treinamento corporativo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
