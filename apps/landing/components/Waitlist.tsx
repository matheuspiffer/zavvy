'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { trackFormSubmission, trackCTAClick } from '@/lib/analytics'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'
type ErrorType = 'invalid' | 'duplicate' | 'rate-limit' | 'generic'

const ERROR_MESSAGES: Record<ErrorType, string> = {
  invalid: 'Por favor, insira um email válido.',
  duplicate: 'Este email já está na lista de espera!',
  'rate-limit': 'Muitas tentativas. Tente novamente em alguns minutos.',
  generic: 'Ops, algo deu errado. Tente novamente.',
}

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorType, setErrorType] = useState<ErrorType | null>(null)

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side validation
    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorType('invalid')
      return
    }

    setStatus('loading')
    setErrorType(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        trackFormSubmission('waitlist', true)
        trackCTAClick('waitlist_submit_success')
      } else {
        setStatus('error')
        if (response.status === 400) {
          setErrorType('invalid')
        } else if (response.status === 409) {
          setErrorType('duplicate')
        } else if (response.status === 429) {
          setErrorType('rate-limit')
        } else {
          setErrorType('generic')
        }
      }
    } catch {
      setStatus('error')
      setErrorType('generic')
      trackFormSubmission('waitlist', false)
    }
  }

  const isLoading = status === 'loading'

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-heading"
      className="py-16 md:py-24 bg-primary-light/30"
    >
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <h2
            id="waitlist-heading"
            className="text-2xl md:text-3xl font-semibold text-text mb-4"
          >
            Entre na lista de espera
          </h2>
          <p className="text-text-muted mb-8">
            Seja o primeiro a saber quando a Zavvy estiver disponível
          </p>

          {status === 'success' ? (
            <p className="text-primary font-medium" role="status">
              Pronto! Você está na lista. Fique de olho no seu email.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  aria-label="Seu email"
                  aria-describedby={status === 'error' ? 'email-error' : undefined}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white hover:bg-primary-dark transition-colors px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando...' : 'Quero ser avisado'}
                </Button>
              </div>

              {status === 'error' && errorType && (
                <p
                  id="email-error"
                  className="mt-3 text-sm text-error"
                  role="alert"
                >
                  {ERROR_MESSAGES[errorType]}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
