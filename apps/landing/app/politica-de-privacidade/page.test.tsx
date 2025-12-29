import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PoliticaDePrivacidadePage from './page'

describe('PoliticaDePrivacidadePage', () => {
  it('renders the page heading', () => {
    render(<PoliticaDePrivacidadePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Política de Privacidade/i })
    ).toBeInTheDocument()
  })

  it('renders last updated date', () => {
    render(<PoliticaDePrivacidadePage />)

    expect(
      screen.getByText(/Última atualização: Dezembro de 2025/i)
    ).toBeInTheDocument()
  })

  it('has correct section element id for accessibility', () => {
    render(<PoliticaDePrivacidadePage />)

    const section = document.getElementById('politica-de-privacidade')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<PoliticaDePrivacidadePage />)

    const main = document.getElementById('politica-de-privacidade')
    expect(main).toHaveAttribute('aria-labelledby', 'politica-heading')
    expect(document.getElementById('politica-heading')).toBeInTheDocument()
  })

  it('renders all 11 LGPD sections', () => {
    render(<PoliticaDePrivacidadePage />)

    expect(screen.getByRole('heading', { name: /1\. Identificação do Controlador/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /2\. Dados Pessoais Coletados/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /3\. Finalidade do Tratamento/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /4\. Base Legal \(LGPD Art\. 7\)/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /5\. Compartilhamento de Dados/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /6\. Armazenamento e Segurança/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /7\. Retenção de Dados/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /8\. Seus Direitos \(LGPD Arts\. 17-22\)/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /9\. Cookies e Tecnologias de Rastreamento/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /10\. Alterações nesta Política/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /11\. Contato e Encarregado \(DPO\)/i })).toBeInTheDocument()
  })

  it('renders navigation back to home', () => {
    render(<PoliticaDePrivacidadePage />)

    const backLink = screen.getByRole('link', { name: /Voltar para home/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })

  // Note: Header and Footer are now rendered in layout.tsx, not in individual pages
  // Their tests should be in layout or integration tests

  it('renders DPO contact email', () => {
    render(<PoliticaDePrivacidadePage />)

    const dpoEmailLinks = screen.getAllByRole('link', { name: /privacidade@zavvy.app/i })
    expect(dpoEmailLinks.length).toBeGreaterThanOrEqual(1)
    expect(dpoEmailLinks[0]).toHaveAttribute('href', 'mailto:privacidade@zavvy.app')
  })

  it('renders general contact email', () => {
    render(<PoliticaDePrivacidadePage />)

    const contactEmailLinks = screen.getAllByRole('link', { name: /contato@zavvy.app/i })
    expect(contactEmailLinks.length).toBeGreaterThanOrEqual(1)
    expect(contactEmailLinks[0]).toHaveAttribute('href', 'mailto:contato@zavvy.app')
  })

  it('has proper heading hierarchy (h1 → h2)', () => {
    render(<PoliticaDePrivacidadePage />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })

    expect(h1).toBeInTheDocument()
    expect(h2s.length).toBe(11) // 11 sections
  })

  it('has correct responsive padding classes', () => {
    render(<PoliticaDePrivacidadePage />)

    const main = document.getElementById('politica-de-privacidade')
    expect(main).toHaveClass('py-16')
    expect(main).toHaveClass('md:py-24')
  })

  it('uses container class for consistent max-width', () => {
    render(<PoliticaDePrivacidadePage />)

    const main = document.getElementById('politica-de-privacidade')
    const container = main?.querySelector('.container')
    expect(container).toBeInTheDocument()
  })

  it('uses max-w-3xl for content readability', () => {
    render(<PoliticaDePrivacidadePage />)

    const contentContainer = document.querySelector('.max-w-3xl')
    expect(contentContainer).toBeInTheDocument()
  })

  it('mentions LGPD in content', () => {
    render(<PoliticaDePrivacidadePage />)

    const lgpdMentions = screen.getAllByText(/LGPD/i)
    expect(lgpdMentions.length).toBeGreaterThanOrEqual(3)
  })

  it('mentions ANPD (Autoridade Nacional de Proteção de Dados)', () => {
    render(<PoliticaDePrivacidadePage />)

    expect(screen.getByText(/Autoridade Nacional de Proteção de Dados/i)).toBeInTheDocument()
  })

  it('has focus indicator styles on back link', () => {
    render(<PoliticaDePrivacidadePage />)

    const backLink = screen.getByRole('link', { name: /Voltar para home/i })
    expect(backLink).toHaveClass('focus:text-primary')
    expect(backLink).toHaveClass('focus:ring-2')
    expect(backLink).toHaveClass('focus:ring-primary')
  })

  it('sections have aria-labelledby for accessibility', () => {
    render(<PoliticaDePrivacidadePage />)

    // Check that sections have aria-labelledby pointing to their headings
    const section1 = document.getElementById('section-1')
    expect(section1).toBeInTheDocument()
    expect(section1?.closest('section')).toHaveAttribute('aria-labelledby', 'section-1')

    const section11 = document.getElementById('section-11')
    expect(section11).toBeInTheDocument()
    expect(section11?.closest('section')).toHaveAttribute('aria-labelledby', 'section-11')
  })

  it('renders Portuguese accented terms correctly', () => {
    render(<PoliticaDePrivacidadePage />)

    // Verify key accented terms are present
    expect(screen.getByRole('heading', { name: /Identificação do Controlador/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Retenção de Dados/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Alterações nesta Política/i })).toBeInTheDocument()
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument()
  })

  it('includes data subject rights content', () => {
    render(<PoliticaDePrivacidadePage />)

    // Check LGPD rights are mentioned (using getAllByText for multiple matches)
    expect(screen.getAllByText(/Confirmação:/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Acesso:/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Correção:/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Portabilidade:/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Revogação:/i).length).toBeGreaterThanOrEqual(1)
  })

  it('includes legal bases content', () => {
    render(<PoliticaDePrivacidadePage />)

    // Check legal bases are mentioned (using getAllByText for multiple matches)
    expect(screen.getAllByText(/Execução de contrato/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Consentimento/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Legítimo interesse/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Cumprimento de obrigação legal/i).length).toBeGreaterThanOrEqual(1)
  })

  it('has focus indicator styles on email links', () => {
    render(<PoliticaDePrivacidadePage />)

    const emailLinks = screen.getAllByRole('link', { name: /contato@zavvy.app/i })
    expect(emailLinks[0]).toHaveClass('focus:ring-2')
    expect(emailLinks[0]).toHaveClass('focus:ring-primary')

    const dpoLinks = screen.getAllByRole('link', { name: /privacidade@zavvy.app/i })
    expect(dpoLinks[0]).toHaveClass('focus:ring-2')
    expect(dpoLinks[0]).toHaveClass('focus:ring-primary')
  })

  it('renders h3 headings in data collected section', () => {
    render(<PoliticaDePrivacidadePage />)

    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s.length).toBe(3)

    expect(screen.getByRole('heading', { level: 3, name: /Dados de Identificação/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Dados de Uso/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Dados de Pagamento/i })).toBeInTheDocument()
  })

  it('h3 headings have IDs for accessibility', () => {
    render(<PoliticaDePrivacidadePage />)

    expect(document.getElementById('section-2-1')).toBeInTheDocument()
    expect(document.getElementById('section-2-2')).toBeInTheDocument()
    expect(document.getElementById('section-2-3')).toBeInTheDocument()
  })
})
