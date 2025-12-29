import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { trackCTAClick, trackScrollDepth, trackFormSubmission, trackEvent, trackPageView } from './analytics'

// Mock the gtag module
vi.mock('./gtag', () => ({
  GA_MEASUREMENT_ID: 'G-TEST123',
  isGtagAvailable: vi.fn(() => true),
  pageview: vi.fn(),
  event: vi.fn(),
}))

import { pageview, event, isGtagAvailable } from './gtag'

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test-page' },
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('trackPageView', () => {
    it('calls pageview with the correct URL', () => {
      trackPageView('/test-path')
      expect(pageview).toHaveBeenCalledWith('/test-path')
    })
  })

  describe('trackEvent', () => {
    it('calls event with action and params', () => {
      trackEvent('test_action', { key: 'value' })
      expect(event).toHaveBeenCalledWith('test_action', { key: 'value' })
    })

    it('calls event with action only when no params', () => {
      trackEvent('test_action')
      expect(event).toHaveBeenCalledWith('test_action', undefined)
    })
  })

  describe('trackCTAClick', () => {
    it('tracks CTA click with button_id and page_path', () => {
      trackCTAClick('hero_cta')
      expect(event).toHaveBeenCalledWith('cta_click', {
        button_id: 'hero_cta',
        page_path: '/test-page',
      })
    })

    it('tracks different button IDs correctly', () => {
      trackCTAClick('pricing_starter')
      expect(event).toHaveBeenCalledWith('cta_click', {
        button_id: 'pricing_starter',
        page_path: '/test-page',
      })
    })
  })

  describe('trackScrollDepth', () => {
    it('tracks scroll depth with percentage and page_path', () => {
      trackScrollDepth(25)
      expect(event).toHaveBeenCalledWith('scroll_depth', {
        depth_percentage: 25,
        page_path: '/test-page',
      })
    })

    it('tracks different scroll depth values', () => {
      trackScrollDepth(50)
      expect(event).toHaveBeenCalledWith('scroll_depth', {
        depth_percentage: 50,
        page_path: '/test-page',
      })

      trackScrollDepth(75)
      expect(event).toHaveBeenCalledWith('scroll_depth', {
        depth_percentage: 75,
        page_path: '/test-page',
      })

      trackScrollDepth(100)
      expect(event).toHaveBeenCalledWith('scroll_depth', {
        depth_percentage: 100,
        page_path: '/test-page',
      })
    })
  })

  describe('trackFormSubmission', () => {
    it('tracks successful form submission', () => {
      trackFormSubmission('waitlist', true)
      expect(event).toHaveBeenCalledWith('form_submit', {
        form_id: 'waitlist',
        success: true,
        page_path: '/test-page',
      })
    })

    it('tracks failed form submission', () => {
      trackFormSubmission('waitlist', false)
      expect(event).toHaveBeenCalledWith('form_submit', {
        form_id: 'waitlist',
        success: false,
        page_path: '/test-page',
      })
    })
  })

  describe('SSR safety', () => {
    it('does not throw when window is undefined', () => {
      const originalWindow = global.window
      // @ts-expect-error - intentionally testing undefined window
      delete global.window

      expect(() => trackCTAClick('test')).not.toThrow()
      expect(() => trackScrollDepth(50)).not.toThrow()
      expect(() => trackFormSubmission('test', true)).not.toThrow()

      global.window = originalWindow
    })
  })
})
