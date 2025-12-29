'use client'

import { useRef, useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieConsent() {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent()
  const bannerRef = useRef<HTMLDivElement>(null)

  // Move focus to banner when it appears (accessibility - AC #6)
  useEffect(() => {
    if (showBanner && bannerRef.current) {
      bannerRef.current.focus()
    }
  }, [showBanner])

  if (!showBanner) return null

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label="Consentimento de cookies"
      aria-modal="false"
      tabIndex={-1}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-light shadow-lg focus:outline-none"
    >
      <div className="container py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text text-center md:text-left">
            Utilizamos cookies para melhorar sua experiência. Ao continuar navegando,
            você concorda com nossa{' '}
            <Link
              href="/politica-de-privacidade"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Política de Privacidade
            </Link>.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              aria-label="Recusar cookies"
            >
              Recusar
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              aria-label="Aceitar cookies"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
