import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from './HowItWorks'

describe('HowItWorks', () => {
  it('renders the section heading', () => {
    render(<HowItWorks />)

    expect(
      screen.getByRole('heading', { name: /Como funciona/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<HowItWorks />)

    expect(
      screen.getByText(/Em 4 passos simples, você automatiza sua agenda/i)
    ).toBeInTheDocument()
  })

  it('renders all 4 steps with numbers', () => {
    render(<HowItWorks />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('renders all 4 step titles', () => {
    render(<HowItWorks />)

    expect(screen.getByText('Configure seus serviços')).toBeInTheDocument()
    expect(screen.getByText('Compartilhe seu link')).toBeInTheDocument()
    expect(screen.getByText('Clientes agendam sozinhos')).toBeInTheDocument()
    expect(screen.getByText('Zavvy cuida do resto')).toBeInTheDocument()
  })

  it('renders all 4 step descriptions', () => {
    render(<HowItWorks />)

    expect(
      screen.getByText(/Cadastre os serviços que você oferece/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Envie seu link de agendamento/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Sem troca de mensagens/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Confirmações, lembretes e reagendamentos automáticos/i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<HowItWorks />)

    const section = document.getElementById('como-funciona')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<HowItWorks />)

    const section = document.getElementById('como-funciona')
    expect(section).toHaveAttribute('aria-labelledby', 'como-funciona-heading')
    expect(document.getElementById('como-funciona-heading')).toBeInTheDocument()
  })

  it('renders icons for each step', () => {
    render(<HowItWorks />)

    // Check that 4 step icons exist (Settings, Share2, CalendarCheck, MessageCircle)
    // Plus 3 ChevronRight arrows = 7 total Lucide icons
    const allIcons = document.querySelectorAll('.lucide')
    expect(allIcons.length).toBe(7) // 4 step icons + 3 arrows

    // Verify step icons specifically
    const stepIcons = document.querySelectorAll('.bg-primary-light .lucide')
    expect(stepIcons.length).toBe(4)
  })

  it('uses correct responsive grid classes', () => {
    render(<HowItWorks />)

    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('sm:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-4')
  })

  it('uses Trust Green theme colors for step numbers', () => {
    render(<HowItWorks />)

    const numberBadge = document.querySelector('.bg-primary')
    expect(numberBadge).toBeInTheDocument()
  })

  it('uses light green background for icons', () => {
    render(<HowItWorks />)

    const iconBg = document.querySelector('.bg-primary-light')
    expect(iconBg).toBeInTheDocument()
  })

  it('has hover effect on icon containers', () => {
    render(<HowItWorks />)

    const iconContainer = document.querySelector('.group-hover\\:scale-105')
    expect(iconContainer).toBeInTheDocument()
  })

  it('renders step cards with correct structure (number → icon → title → description)', () => {
    render(<HowItWorks />)

    // Each step card should have: number badge, icon, title (h3), description (p)
    const stepCards = document.querySelectorAll('.group')
    expect(stepCards.length).toBe(4)

    // Verify first card structure
    const firstCard = stepCards[0]
    expect(firstCard.querySelector('.bg-primary')).toBeInTheDocument() // number badge
    expect(firstCard.querySelector('.bg-primary-light')).toBeInTheDocument() // icon container
    expect(firstCard.querySelector('h3')).toBeInTheDocument() // title
    expect(firstCard.querySelector('p')).toBeInTheDocument() // description
  })

  it('renders connecting arrows between steps on desktop', () => {
    render(<HowItWorks />)

    // Should have 3 arrows (between 4 steps)
    const arrows = document.querySelectorAll('.lucide-chevron-right')
    expect(arrows.length).toBe(3)
  })
})
