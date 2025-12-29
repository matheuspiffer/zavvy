import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TermosDeUsoPage from './page'

describe('TermosDeUsoPage', () => {
  it('renders the page heading', () => {
    render(<TermosDeUsoPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Termos de Uso/i })
    ).toBeInTheDocument()
  })

  it('renders last updated date', () => {
    render(<TermosDeUsoPage />)

    expect(
      screen.getByText(/Última atualização: Dezembro de 2025/i)
    ).toBeInTheDocument()
  })

  it('has correct section element id for accessibility', () => {
    render(<TermosDeUsoPage />)

    const section = document.getElementById('termos-de-uso')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<TermosDeUsoPage />)

    const main = document.getElementById('termos-de-uso')
    expect(main).toHaveAttribute('aria-labelledby', 'termos-heading')
    expect(document.getElementById('termos-heading')).toBeInTheDocument()
  })

  it('renders all 10 sections', () => {
    render(<TermosDeUsoPage />)

    expect(screen.getByRole('heading', { name: /1\. Aceitação dos Termos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /2\. Descrição do Serviço/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /3\. Cadastro e Conta/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /4\. Obrigações do Usuário/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /5\. Limitações de Responsabilidade/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /6\. Propriedade Intelectual/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /7\. Encerramento da Conta/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /8\. Modificações dos Termos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /9\. Lei Aplicável e Foro/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /10\. Contato/i })).toBeInTheDocument()
  })

  it('renders navigation back to home', () => {
    render(<TermosDeUsoPage />)

    const backLink = screen.getByRole('link', { name: /Voltar para home/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })

  // Note: Header and Footer are now rendered in layout.tsx, not in individual pages
  // Their tests should be in layout or integration tests

  it('renders contact email', () => {
    render(<TermosDeUsoPage />)

    const emailLink = screen.getByRole('link', { name: /contato@zavvy.app/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:contato@zavvy.app')
  })

  it('has proper heading hierarchy (h1 → h2)', () => {
    render(<TermosDeUsoPage />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })

    expect(h1).toBeInTheDocument()
    expect(h2s.length).toBe(10) // 10 sections
  })

  it('has correct responsive padding classes', () => {
    render(<TermosDeUsoPage />)

    const main = document.getElementById('termos-de-uso')
    expect(main).toHaveClass('py-16')
    expect(main).toHaveClass('md:py-24')
  })

  it('uses container class for consistent max-width', () => {
    render(<TermosDeUsoPage />)

    const main = document.getElementById('termos-de-uso')
    const container = main?.querySelector('.container')
    expect(container).toBeInTheDocument()
  })

  it('uses max-w-3xl for content readability', () => {
    render(<TermosDeUsoPage />)

    const contentContainer = document.querySelector('.max-w-3xl')
    expect(contentContainer).toBeInTheDocument()
  })

  it('mentions LGPD in content', () => {
    render(<TermosDeUsoPage />)

    // LGPD appears multiple times in the document
    const lgpdMentions = screen.getAllByText(/LGPD/i)
    expect(lgpdMentions.length).toBeGreaterThanOrEqual(1)
  })

  it('mentions Brazilian law for jurisdiction', () => {
    render(<TermosDeUsoPage />)

    expect(screen.getByText(/República Federativa do Brasil/i)).toBeInTheDocument()
  })

  it('has focus indicator styles on back link', () => {
    render(<TermosDeUsoPage />)

    const backLink = screen.getByRole('link', { name: /Voltar para home/i })
    expect(backLink).toHaveClass('focus:text-primary')
    expect(backLink).toHaveClass('focus:ring-2')
    expect(backLink).toHaveClass('focus:ring-primary')
  })

  it('sections have aria-labelledby for accessibility', () => {
    render(<TermosDeUsoPage />)

    // Check that sections have aria-labelledby pointing to their headings
    const section1 = document.getElementById('section-1')
    expect(section1).toBeInTheDocument()
    expect(section1?.closest('section')).toHaveAttribute('aria-labelledby', 'section-1')

    const section10 = document.getElementById('section-10')
    expect(section10).toBeInTheDocument()
    expect(section10?.closest('section')).toHaveAttribute('aria-labelledby', 'section-10')
  })

  it('renders Portuguese accented terms correctly', () => {
    render(<TermosDeUsoPage />)

    // Verify key accented terms are present
    expect(screen.getByRole('heading', { name: /Descrição do Serviço/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Obrigações do Usuário/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Modificações dos Termos/i })).toBeInTheDocument()
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument()
  })
})
