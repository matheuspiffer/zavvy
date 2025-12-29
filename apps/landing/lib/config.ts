/**
 * CTA Mode configuration
 * Controls whether CTA buttons link to waitlist form or signup page
 */
export type CTAMode = 'waitlist' | 'signup'

/**
 * Get the current CTA mode from environment variable
 * @returns 'waitlist' (default) or 'signup'
 */
export function getCTAMode(): CTAMode {
  const mode = process.env.NEXT_PUBLIC_CTA_MODE
  if (mode === 'signup') return 'signup'
  return 'waitlist'
}

/**
 * Get the CTA href based on current mode
 * @returns '#waitlist' for waitlist mode, or signup URL for signup mode
 */
export function getCTAHref(): string {
  const mode = getCTAMode()
  if (mode === 'signup') {
    return process.env.NEXT_PUBLIC_SIGNUP_URL || '/signup'
  }
  return '#waitlist'
}

/**
 * Check if we're in signup mode
 */
export function isSignupMode(): boolean {
  return getCTAMode() === 'signup'
}
