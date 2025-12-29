'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { trackCTAClick } from '@/lib/analytics'
import { getCTAHref, isSignupMode } from '@/lib/config'

const includedFeatures = [
  'Assistente WhatsApp completo',
  'Link de agendamento personalizado',
  'Sincronização com Google Calendar',
  'Lembretes automáticos ilimitados',
  'Confirmações e reagendamentos',
  'Gestão de clientes',
  'Suporte por WhatsApp',
]

export function Pricing() {
  const ctaHref = getCTAHref()
  const signupMode = isSignupMode()

  const handleCTAClick = () => {
    trackCTAClick('pricing_starter')
  }

  return (
    <section id="preco" aria-labelledby="preco-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <h2 id="preco-heading" className="text-2xl md:text-3xl font-semibold text-text text-center mb-4">
          Preço
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Simples e transparente. Sem surpresas.
        </p>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
            {/* Trial Badge */}
            <div className="bg-primary text-white text-center py-2 font-medium">
              7 dias grátis
            </div>

            {/* Plan Content */}
            <div className="p-8">
              {/* Plan Name */}
              <h3 className="text-lg font-semibold text-text text-center mb-4">
                Starter
              </h3>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-text">R$49</span>
                <span className="text-text-muted">/mês</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={ctaHref}
                onClick={handleCTAClick}
                className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                {signupMode ? 'Começar agora' : 'Entrar na lista de espera'}
              </Link>

              {/* Note */}
              <p className="text-text-muted text-xs text-center mt-4">
                Cancele quando quiser. Sem fidelidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
