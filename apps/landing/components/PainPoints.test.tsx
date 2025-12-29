import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PainPoints } from './PainPoints'

describe('PainPoints', () => {
  it('renders the section heading', () => {
    render(<PainPoints />)

    expect(
      screen.getByRole('heading', { name: /O caos de agendar pelo WhatsApp/i })
    ).toBeInTheDocument()
  })

  it('renders all 4 pain points', () => {
    render(<PainPoints />)

    expect(screen.getByText('Mensagens perdidas')).toBeInTheDocument()
    expect(screen.getByText('Conflitos de horário')).toBeInTheDocument()
    expect(screen.getByText('Tempo desperdiçado')).toBeInTheDocument()
    expect(screen.getByText('Faltas e cancelamentos')).toBeInTheDocument()
  })

  it('renders descriptions for each pain point', () => {
    render(<PainPoints />)

    expect(
      screen.getByText(/Clientes mandam mensagem a qualquer hora/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Agenda no papel, no celular, na cabeça/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Horas por semana só confirmando/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Cliente esquece, não avisa/i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<PainPoints />)

    const section = document.getElementById('problemas')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('renders icons for each pain point', () => {
    render(<PainPoints />)

    // Check that 4 icon containers exist
    const iconContainers = document.querySelectorAll('.lucide')
    expect(iconContainers.length).toBe(4)
  })

  it('has aria-labelledby for accessibility', () => {
    render(<PainPoints />)

    const section = document.getElementById('problemas')
    expect(section).toHaveAttribute('aria-labelledby', 'problemas-heading')
    expect(document.getElementById('problemas-heading')).toBeInTheDocument()
  })

  it('uses correct responsive grid classes', () => {
    render(<PainPoints />)

    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('sm:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-4')
  })

  it('uses green theme colors for icons', () => {
    render(<PainPoints />)

    const iconBg = document.querySelector('.bg-primary-light')
    expect(iconBg).toBeInTheDocument()
  })
})
