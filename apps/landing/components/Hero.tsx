'use client'

import Link from 'next/link'
import { MessageCircle, Calendar, Clock } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'
import { getCTAHref, isSignupMode } from '@/lib/config'
import { useScrollDepth } from '@/hooks/useScrollDepth'

export function Hero() {
  // Initialize scroll depth tracking
  useScrollDepth()

  const ctaHref = getCTAHref()
  const signupMode = isSignupMode()

  const handleCTAClick = () => {
    trackCTAClick('hero_cta')
  }

  const handleSecondaryClick = () => {
    trackCTAClick('hero_how_it_works')
  }
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-light/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary-light/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4" />
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-light/50 text-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp-first</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-lg font-bold text-text mb-6 leading-tight">
            Seu assistente de agendamentos no{' '}
            <span className="text-primary">WhatsApp</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Automatize confirmações, lembretes e reagendamentos. Seus clientes marcam pelo link, você gerencia pelo WhatsApp.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href={ctaHref}
              onClick={handleCTAClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              {signupMode ? 'Começar agora' : 'Entrar na lista de espera'}
            </Link>
            <Link
              href="#como-funciona"
              onClick={handleSecondaryClick}
              className="w-full sm:w-auto text-text-muted hover:text-text font-medium px-8 py-4 transition-colors"
            >
              Veja como funciona
            </Link>
          </div>

          {/* Features mini-list */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-text-muted">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Agendamento automático</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Confirmações via WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Lembretes automáticos</span>
            </div>
          </div>
        </div>

        {/* Hero illustration placeholder */}
        <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-light/50 to-primary-light/20 rounded-2xl border border-primary-light flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-text-muted text-sm">
                Ilustração do produto em breve
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
