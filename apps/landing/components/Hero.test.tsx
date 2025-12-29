import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Seu assistente de agendamentos no/i
    )
  })

  it('renders the WhatsApp keyword in headline', () => {
    render(<Hero />)

    // Check that WhatsApp appears multiple times (badge, headline, features)
    const whatsappElements = screen.getAllByText(/WhatsApp/i)
    expect(whatsappElements.length).toBeGreaterThanOrEqual(1)

    // Specifically check the headline contains WhatsApp
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/WhatsApp/i)
  })

  it('renders the subheadline with value proposition', () => {
    render(<Hero />)

    expect(
      screen.getByText(/Automatize confirmações, lembretes e reagendamentos/i)
    ).toBeInTheDocument()
  })

  it('renders the primary CTA button', () => {
    render(<Hero />)

    const ctaButton = screen.getByRole('link', { name: /Entrar na lista de espera/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '#waitlist')
  })

  it('renders the secondary CTA link', () => {
    render(<Hero />)

    const secondaryLink = screen.getByRole('link', { name: /Veja como funciona/i })
    expect(secondaryLink).toBeInTheDocument()
    expect(secondaryLink).toHaveAttribute('href', '#como-funciona')
  })

  it('renders feature highlights', () => {
    render(<Hero />)

    expect(screen.getByText(/Agendamento automático/i)).toBeInTheDocument()
    expect(screen.getByText(/Confirmações via WhatsApp/i)).toBeInTheDocument()
    expect(screen.getByText(/Lembretes automáticos/i)).toBeInTheDocument()
  })
})
