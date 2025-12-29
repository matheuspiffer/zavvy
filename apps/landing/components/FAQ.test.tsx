import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FAQ } from './FAQ'

describe('FAQ', () => {
  it('renders the section heading', () => {
    render(<FAQ />)

    expect(
      screen.getByRole('heading', { name: /Perguntas Frequentes/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<FAQ />)

    expect(
      screen.getByText(/Tudo que você precisa saber sobre a Zavvy/i)
    ).toBeInTheDocument()
  })

  it('renders all 8 FAQ questions', () => {
    render(<FAQ />)

    expect(screen.getByText('Quanto custa a Zavvy?')).toBeInTheDocument()
    expect(screen.getByText('Preciso ter WhatsApp Business?')).toBeInTheDocument()
    expect(screen.getByText('Como funciona a integração com Google Calendar?')).toBeInTheDocument()
    expect(screen.getByText('Como meus clientes agendam?')).toBeInTheDocument()
    expect(screen.getByText('Posso cancelar a qualquer momento?')).toBeInTheDocument()
    expect(screen.getByText('Meus dados estão seguros?')).toBeInTheDocument()
    expect(screen.getByText('A Zavvy funciona para qualquer profissão?')).toBeInTheDocument()
    expect(screen.getByText('Como começo a usar?')).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<FAQ />)

    const section = document.getElementById('faq')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<FAQ />)

    const section = document.getElementById('faq')
    expect(section).toHaveAttribute('aria-labelledby', 'faq-heading')
    expect(document.getElementById('faq-heading')).toBeInTheDocument()
  })

  it('expands accordion item when clicked', () => {
    render(<FAQ />)

    // Click on first question
    const firstQuestion = screen.getByText('Quanto custa a Zavvy?')
    fireEvent.click(firstQuestion)

    // Answer should now be visible
    expect(
      screen.getByText(/O plano Starter custa R\$49\/mês/i)
    ).toBeVisible()
  })

  it('collapses accordion item when clicked again', () => {
    render(<FAQ />)

    // Click to expand
    const firstQuestion = screen.getByText('Quanto custa a Zavvy?')
    fireEvent.click(firstQuestion)

    // Click again to collapse
    fireEvent.click(firstQuestion)

    // The button should now have data-state="closed"
    expect(firstQuestion.closest('button')).toHaveAttribute('data-state', 'closed')
  })

  it('has keyboard accessible accordion triggers', () => {
    render(<FAQ />)

    // All accordion triggers should be buttons (keyboard accessible)
    const triggers = screen.getAllByRole('button')
    expect(triggers.length).toBe(8) // 8 FAQ items
  })

  it('accordion triggers are focusable for keyboard navigation', () => {
    render(<FAQ />)

    const firstTrigger = screen.getByText('Quanto custa a Zavvy?').closest('button')
    expect(firstTrigger).not.toBeNull()

    // Buttons are focusable by default (keyboard accessible)
    // Radix handles Enter/Space natively via button element
    expect(firstTrigger).toHaveAttribute('type', 'button')
    expect(firstTrigger).toHaveAttribute('aria-expanded')
  })

  it('accordion triggers have correct aria-expanded attribute', () => {
    render(<FAQ />)

    const firstTrigger = screen.getByText('Quanto custa a Zavvy?').closest('button')

    // Initially collapsed
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')

    // Click to expand
    fireEvent.click(firstTrigger!)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')

    // Click to collapse
    fireEvent.click(firstTrigger!)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders accordion with correct structure', () => {
    render(<FAQ />)

    // Check for accordion items
    const accordionItems = document.querySelectorAll('[data-state]')
    expect(accordionItems.length).toBeGreaterThanOrEqual(8)
  })

  it('has white background (alternating pattern after Pricing gray-50)', () => {
    render(<FAQ />)

    const section = document.getElementById('faq')
    // FAQ section should NOT have bg-gray-50 (it comes after Pricing which has gray-50)
    expect(section).not.toHaveClass('bg-gray-50')
  })

  it('uses max-w-3xl for content readability', () => {
    render(<FAQ />)

    const contentContainer = document.querySelector('.max-w-3xl')
    expect(contentContainer).toBeInTheDocument()
  })

  it('renders answers with correct content when expanded', () => {
    render(<FAQ />)

    // Expand the security question
    const securityQuestion = screen.getByText('Meus dados estão seguros?')
    fireEvent.click(securityQuestion)
    expect(screen.getByText(/Seguimos a LGPD rigorosamente/i)).toBeVisible()

    // Click to collapse, then expand cancellation question
    fireEvent.click(securityQuestion)
    const cancelQuestion = screen.getByText('Posso cancelar a qualquer momento?')
    fireEvent.click(cancelQuestion)
    expect(screen.getByText(/Não há fidelidade ou multa/i)).toBeVisible()

    // Click to collapse, then expand profession question
    fireEvent.click(cancelQuestion)
    const professionQuestion = screen.getByText('A Zavvy funciona para qualquer profissão?')
    fireEvent.click(professionQuestion)
    expect(screen.getByText(/psicólogos, advogados, nutricionistas/i)).toBeVisible()
  })

  it('has hover effect on accordion triggers', () => {
    render(<FAQ />)

    const trigger = screen.getByText('Quanto custa a Zavvy?')
    expect(trigger).toHaveClass('hover:text-primary')
  })

  it('has correct responsive padding classes', () => {
    render(<FAQ />)

    const section = document.getElementById('faq')
    expect(section).toHaveClass('py-16')
    expect(section).toHaveClass('md:py-24')
  })
})
