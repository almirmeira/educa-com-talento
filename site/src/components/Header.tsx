'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/#inicio', label: 'Início' },
    { href: '/#sobre', label: 'Quem Somos' },
    { href: '/#metodologias', label: 'Metodologias' },
    { href: '/#servicos', label: 'Serviços' },
    { href: '/#cursos', label: 'Cursos Online' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contato', label: 'Contato' },
  ]

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Educa Com Talento"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-green-800 hidden sm:block">
              Educa Com Talento
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/#contato"
            className="hidden md:inline-flex bg-green-700 text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition-colors"
          >
            Fale Conosco
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contato"
              className="block mt-4 bg-green-700 text-white px-6 py-2 rounded-full font-medium text-center hover:bg-green-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fale Conosco
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
