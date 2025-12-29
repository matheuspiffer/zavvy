import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pricing } from './Pricing'

describe('Pricing', () => {
  it('renders the section heading', () => {
    render(<Pricing />)

    expect(
      screen.getByRole('heading', { name: /Preço/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Pricing />)

    expect(
      screen.getByText(/Simples e transparente. Sem surpresas./i)
    ).toBeInTheDocument()
  })

  it('renders the plan name', () => {
    render(<Pricing />)

    expect(screen.getByText('Starter')).toBeInTheDocument()
  })

  it('renders the price correctly', () => {
    render(<Pricing />)

    expect(screen.getByText('R$49')).toBeInTheDocument()
    expect(screen.getByText('/mês')).toBeInTheDocument()
  })

  it('renders the trial badge', () => {
    render(<Pricing />)

    expect(screen.getByText('7 dias grátis')).toBeInTheDocument()
  })

  it('renders all included features', () => {
    render(<Pricing />)

    expect(screen.getByText('Assistente WhatsApp completo')).toBeInTheDocument()
    expect(screen.getByText('Link de agendamento personalizado')).toBeInTheDocument()
    expect(screen.getByText('Sincronização com Google Calendar')).toBeInTheDocument()
    expect(screen.getByText('Lembretes automáticos ilimitados')).toBeInTheDocument()
    expect(screen.getByText('Confirmações e reagendamentos')).toBeInTheDocument()
    expect(screen.getByText('Gestão de clientes')).toBeInTheDocument()
    expect(screen.getByText('Suporte por WhatsApp')).toBeInTheDocument()
  })

  it('renders check icons for features', () => {
    render(<Pricing />)

    // 7 check icons for 7 features
    const checkIcons = document.querySelectorAll('.lucide-check')
    expect(checkIcons.length).toBe(7)
  })

  it('renders CTA button with correct href', () => {
    render(<Pricing />)

    const ctaButton = screen.getByRole('link', { name: /Entrar na lista de espera/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '#waitlist')
  })

  it('renders the cancellation note', () => {
    render(<Pricing />)

    expect(
      screen.getByText(/Cancele quando quiser. Sem fidelidade./i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<Pricing />)

    const section = document.getElementById('preco')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<Pricing />)

    const section = document.getElementById('preco')
    expect(section).toHaveAttribute('aria-labelledby', 'preco-heading')
    expect(document.getElementById('preco-heading')).toBeInTheDocument()
  })

  it('has gray background for alternating pattern', () => {
    render(<Pricing />)

    const section = document.getElementById('preco')
    expect(section).toHaveClass('bg-gray-50')
  })

  it('has hover effect on CTA button', () => {
    render(<Pricing />)

    const ctaButton = screen.getByRole('link', { name: /Entrar na lista de espera/i })
    expect(ctaButton).toHaveClass('hover:bg-primary-dark')
  })
})
