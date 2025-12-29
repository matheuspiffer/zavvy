import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Config', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getCTAMode', () => {
    it('returns waitlist by default when env not set', async () => {
      delete process.env.NEXT_PUBLIC_CTA_MODE
      const { getCTAMode } = await import('./config')
      expect(getCTAMode()).toBe('waitlist')
    })

    it('returns waitlist when env is waitlist', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'waitlist'
      const { getCTAMode } = await import('./config')
      expect(getCTAMode()).toBe('waitlist')
    })

    it('returns signup when env is signup', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'signup'
      const { getCTAMode } = await import('./config')
      expect(getCTAMode()).toBe('signup')
    })

    it('returns waitlist for invalid values', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'invalid'
      const { getCTAMode } = await import('./config')
      expect(getCTAMode()).toBe('waitlist')
    })
  })

  describe('getCTAHref', () => {
    it('returns #waitlist in waitlist mode', async () => {
      delete process.env.NEXT_PUBLIC_CTA_MODE
      const { getCTAHref } = await import('./config')
      expect(getCTAHref()).toBe('#waitlist')
    })

    it('returns custom signup URL when in signup mode with URL set', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'signup'
      process.env.NEXT_PUBLIC_SIGNUP_URL = 'https://app.zavvy.app/signup'
      const { getCTAHref } = await import('./config')
      expect(getCTAHref()).toBe('https://app.zavvy.app/signup')
    })

    it('returns /signup as fallback in signup mode without URL', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'signup'
      delete process.env.NEXT_PUBLIC_SIGNUP_URL
      const { getCTAHref } = await import('./config')
      expect(getCTAHref()).toBe('/signup')
    })
  })

  describe('isSignupMode', () => {
    it('returns false in waitlist mode', async () => {
      delete process.env.NEXT_PUBLIC_CTA_MODE
      const { isSignupMode } = await import('./config')
      expect(isSignupMode()).toBe(false)
    })

    it('returns true in signup mode', async () => {
      process.env.NEXT_PUBLIC_CTA_MODE = 'signup'
      const { isSignupMode } = await import('./config')
      expect(isSignupMode()).toBe(true)
    })
  })
})
