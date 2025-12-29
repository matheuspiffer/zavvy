import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CookieConsent } from './CookieConsent'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('Banner Visibility', () => {
    it('renders banner on first visit (no localStorage)', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: /Consentimento de cookies/i })).toBeInTheDocument()
      })
    })

    it('does not render banner when consent is already accepted', async () => {
      localStorageMock.getItem.mockReturnValue('accepted')

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not render banner when consent is already rejected', async () => {
      localStorageMock.getItem.mockReturnValue('rejected')

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('User Interactions', () => {
    it('clicking "Aceitar" stores consent and hides banner', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const acceptButton = screen.getByRole('button', { name: /Aceitar cookies/i })
      fireEvent.click(acceptButton)

      expect(localStorageMock.setItem).toHaveBeenCalledWith('zavvy-cookie-consent', 'accepted')

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('clicking "Recusar" stores rejection and hides banner', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const rejectButton = screen.getByRole('button', { name: /Recusar cookies/i })
      fireEvent.click(rejectButton)

      expect(localStorageMock.setItem).toHaveBeenCalledWith('zavvy-cookie-consent', 'rejected')

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Content', () => {
    it('renders cookie explanation text in pt-BR', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByText(/Utilizamos cookies para melhorar sua experiência/i)).toBeInTheDocument()
      })
    })

    it('renders link to privacy policy', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const link = screen.getByRole('link', { name: /Política de Privacidade/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/politica-de-privacidade')
      })
    })

    it('renders "Aceitar" button', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Aceitar cookies/i })).toBeInTheDocument()
      })
    })

    it('renders "Recusar" button', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Recusar cookies/i })).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('banner has proper aria-label for dialog', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('aria-label', 'Consentimento de cookies')
      })
    })

    it('accept button has aria-label', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /Aceitar cookies/i })
        expect(button).toHaveAttribute('aria-label', 'Aceitar cookies')
      })
    })

    it('reject button has aria-label', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /Recusar cookies/i })
        expect(button).toHaveAttribute('aria-label', 'Recusar cookies')
      })
    })

    it('dialog has aria-modal set to false (non-modal)', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('aria-modal', 'false')
      })
    })

    it('privacy policy link has focus styles', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const link = screen.getByRole('link', { name: /Política de Privacidade/i })
        expect(link).toHaveClass('focus:ring-2')
        expect(link).toHaveClass('focus:ring-primary')
      })
    })
  })

  describe('SSR Safety', () => {
    it('handles invalid localStorage values gracefully', async () => {
      // Simulate invalid value in localStorage
      localStorageMock.getItem.mockReturnValue('invalid-value')

      render(<CookieConsent />)

      // Should show banner because invalid value is treated as null
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })
  })

  describe('Styling', () => {
    it('banner is fixed at bottom of viewport', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveClass('fixed')
        expect(dialog).toHaveClass('bottom-0')
      })
    })

    it('banner has high z-index', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveClass('z-50')
      })
    })

    it('uses container class for consistent max-width', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(<CookieConsent />)

      await waitFor(() => {
        const container = document.querySelector('.container')
        expect(container).toBeInTheDocument()
      })
    })
  })
})
