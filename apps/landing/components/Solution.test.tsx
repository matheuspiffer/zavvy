import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Solution } from './Solution'

describe('Solution', () => {
  it('renders the section heading', () => {
    render(<Solution />)

    expect(
      screen.getByRole('heading', { name: /Com Zavvy, você só atende/i })
    ).toBeInTheDocument()
  })

  it('renders Before column with correct items', () => {
    render(<Solution />)

    expect(screen.getByText('Mensagens a qualquer hora')).toBeInTheDocument()
    expect(screen.getByText('Conflitos de agenda')).toBeInTheDocument()
    expect(screen.getByText('Horas confirmando')).toBeInTheDocument()
    expect(screen.getByText('Faltas surpresa')).toBeInTheDocument()
  })

  it('renders After column with correct items', () => {
    render(<Solution />)

    expect(screen.getByText('Agendamento automático 24h')).toBeInTheDocument()
    expect(screen.getByText('Calendário sempre atualizado')).toBeInTheDocument()
    expect(screen.getByText('Confirmações automáticas')).toBeInTheDocument()
    expect(screen.getByText('Lembretes que funcionam')).toBeInTheDocument()
  })

  it('renders the closing statement', () => {
    render(<Solution />)

    expect(
      screen.getByText(/Seus clientes marcam pelo link/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Zavvy cuida do resto/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Você só aparece na hora/i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<Solution />)

    const section = document.getElementById('solucao')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('renders Before and After column headers', () => {
    render(<Solution />)

    expect(screen.getByText('Antes')).toBeInTheDocument()
    expect(screen.getByText('Com Zavvy')).toBeInTheDocument()
  })

  it('renders check icons for After items and X icons for Before items', () => {
    render(<Solution />)

    // Check that we have both Check and X icons (8 total - 4 each)
    const checkIcons = document.querySelectorAll('.lucide-check')
    const xIcons = document.querySelectorAll('.lucide-x')

    expect(checkIcons.length).toBe(4)
    expect(xIcons.length).toBe(4)
  })

  it('has aria-labelledby for accessibility', () => {
    render(<Solution />)

    const section = document.getElementById('solucao')
    expect(section).toHaveAttribute('aria-labelledby', 'solucao-heading')
    expect(document.getElementById('solucao-heading')).toBeInTheDocument()
  })

  it('uses correct responsive grid classes', () => {
    render(<Solution />)

    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('md:grid-cols-2')
  })
})
