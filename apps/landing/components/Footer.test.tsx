import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Zavvy. Todos os direitos reservados.`, 'i'))
    ).toBeInTheDocument()
  })

  it('renders Termos de Uso link', () => {
    render(<Footer />)

    const link = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/termos-de-uso')
  })

  it('renders Política de Privacidade link', () => {
    render(<Footer />)

    const link = screen.getByRole('link', { name: /Política de Privacidade/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/politica-de-privacidade')
  })

  it('has accessible navigation label for legal links', () => {
    render(<Footer />)

    const nav = screen.getByRole('navigation', { name: /Links legais/i })
    expect(nav).toBeInTheDocument()
  })

  it('uses container class for consistent max-width', () => {
    render(<Footer />)

    const containers = document.querySelectorAll('.container')
    expect(containers.length).toBeGreaterThan(0)
  })

  it('has hover effect on links', () => {
    render(<Footer />)

    const link = screen.getByRole('link', { name: /Termos de Uso/i })
    expect(link).toHaveClass('hover:text-primary')
  })

  it('has correct border styling', () => {
    render(<Footer />)

    const footer = document.querySelector('footer')
    expect(footer).toHaveClass('border-t')
    expect(footer).toHaveClass('border-border-light')
  })

  describe('Social Links', () => {
    it('renders Instagram link', () => {
      render(<Footer />)

      const link = screen.getByRole('link', { name: /Instagram do Zavvy/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://instagram.com/zavvy.app')
    })

    it('renders LinkedIn link', () => {
      render(<Footer />)

      const link = screen.getByRole('link', { name: /LinkedIn do Zavvy/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://linkedin.com/company/zavvy-app')
    })

    it('social links open in new tab', () => {
      render(<Footer />)

      const instagramLink = screen.getByRole('link', { name: /Instagram do Zavvy/i })
      const linkedinLink = screen.getByRole('link', { name: /LinkedIn do Zavvy/i })

      expect(instagramLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
    })

    it('social links have security attributes', () => {
      render(<Footer />)

      const instagramLink = screen.getByRole('link', { name: /Instagram do Zavvy/i })
      const linkedinLink = screen.getByRole('link', { name: /LinkedIn do Zavvy/i })

      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('has accessible navigation label for social links', () => {
      render(<Footer />)

      const nav = screen.getByRole('navigation', { name: /Redes sociais/i })
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Social Proof Placeholder', () => {
    it('renders social proof placeholder text', () => {
      render(<Footer />)

      expect(screen.getByText(/Depoimentos de clientes em breve/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('legal links have focus styles', () => {
      render(<Footer />)

      const link = screen.getByRole('link', { name: /Termos de Uso/i })
      expect(link).toHaveClass('focus:ring-2')
      expect(link).toHaveClass('focus:ring-primary')
    })

    it('social links have focus styles', () => {
      render(<Footer />)

      const link = screen.getByRole('link', { name: /Instagram do Zavvy/i })
      expect(link).toHaveClass('focus:ring-2')
      expect(link).toHaveClass('focus:ring-primary')
    })
  })
})
