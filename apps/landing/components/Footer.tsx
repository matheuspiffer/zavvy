import Link from 'next/link'
import { Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border-light">
      {/* Social Proof Placeholder */}
      <div className="py-8 border-b border-border-light">
        <div className="container">
          <p className="text-center text-text-muted text-sm">
            Depoimentos de clientes em breve ✨
          </p>
        </div>
      </div>

      {/* Footer Main */}
      <div className="py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-text-muted text-sm">
              © {currentYear} Zavvy. Todos os direitos reservados.
            </p>

            {/* Legal Links */}
            <nav className="flex gap-4 text-sm" aria-label="Links legais">
              <Link
                href="/termos-de-uso"
                className="text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Termos de Uso
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Política de Privacidade
              </Link>
            </nav>

            {/* Social Links */}
            {/* TODO: Update URLs when real social accounts are created */}
            <nav className="flex gap-4" aria-label="Redes sociais">
              <a
                href="https://instagram.com/zavvy.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Zavvy"
                className="text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/zavvy-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn do Zavvy"
                className="text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
