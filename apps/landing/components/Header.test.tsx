import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

describe('Header', () => {
  it('renders the Zavvy logo', () => {
    render(<Header />)

    expect(screen.getByText('Zavvy')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /Problemas/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Solução/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Como Funciona/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Funcionalidades/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Preço/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /FAQ/i })).toBeInTheDocument()
  })

  it('renders the waitlist CTA button', () => {
    render(<Header />)

    const ctaButtons = screen.getAllByRole('link', { name: /Entrar na lista/i })
    expect(ctaButtons.length).toBeGreaterThan(0)
  })

  it('has correct href for navigation links', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /Problemas/i })).toHaveAttribute('href', '#problemas')
    expect(screen.getByRole('link', { name: /Solução/i })).toHaveAttribute('href', '#solucao')
    expect(screen.getByRole('link', { name: /Como Funciona/i })).toHaveAttribute('href', '#como-funciona')
    expect(screen.getByRole('link', { name: /Funcionalidades/i })).toHaveAttribute('href', '#funcionalidades')
    expect(screen.getByRole('link', { name: /Preço/i })).toHaveAttribute('href', '#preco')
    expect(screen.getByRole('link', { name: /FAQ/i })).toHaveAttribute('href', '#faq')
  })

  it('renders mobile menu button', () => {
    render(<Header />)

    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  describe('Mobile Menu Interactions', () => {
    it('opens mobile menu when menu button is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByRole('button', { name: /abrir menu/i })
      await user.click(menuButton)

      // After opening, the button label should change to "Fechar menu"
      expect(screen.getByRole('button', { name: /fechar menu/i })).toBeInTheDocument()
    })

    it('closes mobile menu when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Open menu
      const menuButton = screen.getByRole('button', { name: /abrir menu/i })
      await user.click(menuButton)

      // Close menu
      const closeButton = screen.getByRole('button', { name: /fechar menu/i })
      await user.click(closeButton)

      // Should be back to "Abrir menu"
      expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument()
    })

    it('closes mobile menu when navigation link is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Open menu
      const menuButton = screen.getByRole('button', { name: /abrir menu/i })
      await user.click(menuButton)

      // Click on a navigation link (there are multiple, we need to click the mobile one)
      const mobileLinks = screen.getAllByRole('link', { name: /Como Funciona/i })
      // The mobile link has onClick handler to close menu
      await user.click(mobileLinks[mobileLinks.length - 1] as HTMLElement)

      // Menu should be closed
      expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument()
    })

    it('closes mobile menu when CTA button is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)

      // Open menu
      const menuButton = screen.getByRole('button', { name: /abrir menu/i })
      await user.click(menuButton)

      // Click on mobile CTA button
      const ctaButtons = screen.getAllByRole('link', { name: /Entrar na lista/i })
      // The mobile CTA button (last one)
      await user.click(ctaButtons[ctaButtons.length - 1] as HTMLElement)

      // Menu should be closed
      expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument()
    })

    it('toggles menu icon between hamburger and X', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByRole('button', { name: /abrir menu/i })

      // Initially shows hamburger icon (Menu)
      expect(menuButton.querySelector('.lucide-menu')).toBeInTheDocument()

      // Click to open
      await user.click(menuButton)

      // Now shows X icon
      const closeButton = screen.getByRole('button', { name: /fechar menu/i })
      expect(closeButton.querySelector('.lucide-x')).toBeInTheDocument()
    })
  })
})
