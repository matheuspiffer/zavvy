import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { CookieConsent } from '@/components/CookieConsent'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zavvy.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zavvy - Seu assistente de agendamentos no WhatsApp',
  description: 'Automatize confirmações, lembretes e reagendamentos. Seus clientes marcam pelo link, você gerencia pelo WhatsApp.',
  keywords: ['agendamento', 'whatsapp', 'agenda', 'confirmação', 'lembrete', 'profissional'],
  authors: [{ name: 'Zavvy' }],
  openGraph: {
    title: 'Zavvy - Seu assistente de agendamentos no WhatsApp',
    description: 'Automatize confirmações, lembretes e reagendamentos. Seus clientes marcam pelo link, você gerencia pelo WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Zavvy',
    url: siteUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zavvy - Assistente de agendamentos no WhatsApp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zavvy - Seu assistente de agendamentos no WhatsApp',
    description: 'Automatize confirmações, lembretes e reagendamentos.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10B981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <ErrorBoundary>
          <main id="main-content">{children}</main>
        </ErrorBoundary>
        <Footer />
        <CookieConsent />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
