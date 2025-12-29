import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Waitlist } from './Waitlist'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Waitlist', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders the section heading', () => {
    render(<Waitlist />)

    expect(
      screen.getByRole('heading', { name: /Entre na lista de espera/i })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Waitlist />)

    expect(
      screen.getByText(/Seja o primeiro a saber quando a Zavvy estiver disponível/i)
    ).toBeInTheDocument()
  })

  it('has correct section id for navigation anchor', () => {
    render(<Waitlist />)

    const section = document.getElementById('waitlist')
    expect(section).toBeInTheDocument()
    expect(section?.tagName.toLowerCase()).toBe('section')
  })

  it('has aria-labelledby for accessibility', () => {
    render(<Waitlist />)

    const section = document.getElementById('waitlist')
    expect(section).toHaveAttribute('aria-labelledby', 'waitlist-heading')
    expect(document.getElementById('waitlist-heading')).toBeInTheDocument()
  })

  it('renders email input field', () => {
    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
  })

  it('renders submit button', () => {
    render(<Waitlist />)

    expect(
      screen.getByRole('button', { name: /Quero ser avisado/i })
    ).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'invalid-email' } })
    fireEvent.click(button)

    expect(
      await screen.findByText(/Por favor, insira um email válido/i)
    ).toBeInTheDocument()
  })

  it('shows validation error for empty email submission', async () => {
    render(<Waitlist />)

    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    // Submit without entering any email
    fireEvent.click(button)

    expect(
      await screen.findByText(/Por favor, insira um email válido/i)
    ).toBeInTheDocument()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('shows loading state during submission', async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    )

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.getByRole('button', { name: /Enviando.../i })).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows success message after successful submission', async () => {
    mockFetch.mockResolvedValue({ ok: true })

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Pronto! Você está na lista/i)
      ).toBeInTheDocument()
    })
  })

  it('shows duplicate error for 409 response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 409 })

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'existing@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Este email já está na lista de espera/i)
      ).toBeInTheDocument()
    })
  })

  it('shows rate limit error for 429 response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 429 })

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Muitas tentativas. Tente novamente em alguns minutos/i)
      ).toBeInTheDocument()
    })
  })

  it('shows generic error for network failure', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Ops, algo deu errado/i)
      ).toBeInTheDocument()
    })
  })

  it('disables input and button during loading', async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    )

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })

  it('has correct responsive padding classes', () => {
    render(<Waitlist />)

    const section = document.getElementById('waitlist')
    expect(section).toHaveClass('py-16')
    expect(section).toHaveClass('md:py-24')
  })

  it('has correct background color', () => {
    render(<Waitlist />)

    const section = document.getElementById('waitlist')
    expect(section).toHaveClass('bg-primary-light/30')
  })

  it('uses container class for consistent max-width', () => {
    render(<Waitlist />)

    const section = document.getElementById('waitlist')
    const container = section?.querySelector('.container')
    expect(container).toBeInTheDocument()
  })

  it('input has aria-label for accessibility', () => {
    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    expect(input).toHaveAttribute('aria-label', 'Seu email')
  })

  it('error message has role alert for screen readers', async () => {
    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'invalid-email' } })
    fireEvent.click(button)

    const errorMessage = await screen.findByRole('alert')
    expect(errorMessage).toBeInTheDocument()
  })

  it('success message has role status for screen readers', async () => {
    mockFetch.mockResolvedValue({ ok: true })

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com')
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    const successMessage = await screen.findByRole('status')
    expect(successMessage).toBeInTheDocument()
  })

  it('button has hover effect class', () => {
    render(<Waitlist />)

    const button = screen.getByRole('button', { name: /Quero ser avisado/i })
    expect(button).toHaveClass('hover:bg-primary-dark')
  })

  it('clears email input after successful submission', async () => {
    mockFetch.mockResolvedValue({ ok: true })

    render(<Waitlist />)

    const input = screen.getByPlaceholderText('seu@email.com') as HTMLInputElement
    const button = screen.getByRole('button', { name: /Quero ser avisado/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Pronto! Você está na lista/i)).toBeInTheDocument()
    })
  })
})
