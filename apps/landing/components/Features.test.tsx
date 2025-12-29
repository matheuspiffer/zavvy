import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Features } from './Features'

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />)

    expect(
      screen.getByRole('heading', { name: /Funcionalidades/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Features />)

    expect(
      screen.getByText(/Tudo que você precisa para automatizar sua agenda/i)
    ).toBeInTheDocument()
  })

  it('renders all 8 features', () => {
    render(<Features />)

    expect(screen.getByText('Assistente WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('Link de agendamento')).toBeInTheDocument()
    expect(screen.getByText('Sincronização com Google Calendar')).toBeInTheDocument()
    expect(screen.getByText('Lembretes automáticos')).toBeInTheDocument()
    expect(screen.getByText('Confirmações e reagendamentos')).toBeInTheDocument()
    expect(screen.getByText('Gestão de clientes')).toBeInTheDocument()
    expect(screen.getByText('Relatórios simples')).toBeInTheDocument()
    expect(screen.getByText('Seguro e confiável')).toBeInTheDocument()
  })

  it('renders all feature descriptions', () => {
    render(<Features />)

    // All 8 feature descriptions
    expect(
      screen.getByText(/Gerencie tudo pelo WhatsApp/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Seus clientes agendam sozinhos/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Sua agenda sempre atualizada/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Clientes recebem lembretes/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Confirmação automática/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Histórico completo de cada cliente/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Veja quantos agendamentos/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Seus dados protegidos/i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<Features />)

    const section = document.getElementById('funcionalidades')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<Features />)

    const section = document.getElementById('funcionalidades')
    expect(section).toHaveAttribute('aria-labelledby', 'funcionalidades-heading')
    expect(document.getElementById('funcionalidades-heading')).toBeInTheDocument()
  })

  it('renders icons for each feature', () => {
    render(<Features />)

    // 8 feature icons
    const iconContainers = document.querySelectorAll('.bg-primary-light .lucide')
    expect(iconContainers.length).toBe(8)
  })

  it('uses correct responsive grid classes', () => {
    render(<Features />)

    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('sm:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-4')
  })

  it('has hover effect on feature cards', () => {
    render(<Features />)

    const hoverElement = document.querySelector('.group-hover\\:scale-105')
    expect(hoverElement).toBeInTheDocument()
  })

  it('renders feature cards with correct structure (icon → title → description)', () => {
    render(<Features />)

    // Get first feature card
    const firstCard = screen.getByText('Assistente WhatsApp').closest('.group')
    expect(firstCard).toBeInTheDocument()

    // Verify structure: icon container exists before title
    const iconContainer = firstCard?.querySelector('.bg-primary-light')
    expect(iconContainer).toBeInTheDocument()

    // Verify title (h3) exists
    const title = firstCard?.querySelector('h3')
    expect(title).toHaveTextContent('Assistente WhatsApp')

    // Verify description (p) exists after title
    const description = firstCard?.querySelector('p')
    expect(description).toBeInTheDocument()
  })
})
