import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollDepth } from './useScrollDepth'

// Mock dependencies
vi.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

vi.mock('./useCookieConsent', () => ({
  useCookieConsent: vi.fn(() => ({ consent: 'accepted' })),
}))

vi.mock('@/lib/analytics', () => ({
  trackScrollDepth: vi.fn(),
}))

import { useCookieConsent } from './useCookieConsent'
import { trackScrollDepth } from '@/lib/analytics'

describe('useScrollDepth', () => {
  const mockUseCookieConsent = useCookieConsent as ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock document dimensions
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not track when consent is null', () => {
    mockUseCookieConsent.mockReturnValue({ consent: null })
    renderHook(() => useScrollDepth())

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    window.dispatchEvent(new Event('scroll'))

    expect(trackScrollDepth).not.toHaveBeenCalled()
  })

  it('does not track when consent is rejected', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'rejected' })
    renderHook(() => useScrollDepth())

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    window.dispatchEvent(new Event('scroll'))

    expect(trackScrollDepth).not.toHaveBeenCalled()
  })

  it('tracks when consent is accepted', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'accepted' })
    renderHook(() => useScrollDepth())

    // Simulate 50% scroll (scrollY = 500 of 1000 scrollable)
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    window.dispatchEvent(new Event('scroll'))

    expect(trackScrollDepth).toHaveBeenCalledWith(25)
    expect(trackScrollDepth).toHaveBeenCalledWith(50)
  })

  it('tracks 25% threshold', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'accepted' })
    renderHook(() => useScrollDepth())

    // Simulate 25% scroll
    Object.defineProperty(window, 'scrollY', { value: 250, writable: true })
    window.dispatchEvent(new Event('scroll'))

    expect(trackScrollDepth).toHaveBeenCalledWith(25)
  })

  it('tracks 100% threshold', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'accepted' })
    renderHook(() => useScrollDepth())

    // Simulate 100% scroll
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true })
    window.dispatchEvent(new Event('scroll'))

    expect(trackScrollDepth).toHaveBeenCalledWith(25)
    expect(trackScrollDepth).toHaveBeenCalledWith(50)
    expect(trackScrollDepth).toHaveBeenCalledWith(75)
    expect(trackScrollDepth).toHaveBeenCalledWith(100)
  })

  it('each threshold fires only once', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'accepted' })
    renderHook(() => useScrollDepth())

    // Simulate 50% scroll
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    window.dispatchEvent(new Event('scroll'))

    // Scroll again at same position
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))

    // Should only have been called once for each threshold passed
    const calls25 = (trackScrollDepth as ReturnType<typeof vi.fn>).mock.calls.filter(
      call => call[0] === 25
    )
    const calls50 = (trackScrollDepth as ReturnType<typeof vi.fn>).mock.calls.filter(
      call => call[0] === 50
    )

    expect(calls25).toHaveLength(1)
    expect(calls50).toHaveLength(1)
  })

  it('cleans up scroll listener on unmount', () => {
    mockUseCookieConsent.mockReturnValue({ consent: 'accepted' })
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useScrollDepth())
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
