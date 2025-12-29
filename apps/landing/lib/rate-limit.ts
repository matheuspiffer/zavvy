const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Cleanup expired entries periodically to prevent memory leaks
function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}

// Run cleanup every 5 minutes
let cleanupInterval: ReturnType<typeof setInterval> | null = null
if (typeof setInterval !== 'undefined' && !cleanupInterval) {
  cleanupInterval = setInterval(cleanupExpiredEntries, 5 * 60 * 1000)
}

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 3

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    // Clean up this specific expired entry and set new one
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true // Allowed
  }

  if (record.count >= maxRequests) {
    return false // Rate limited
  }

  record.count++
  return true // Allowed
}

// For testing purposes
export function resetRateLimits(): void {
  rateLimitMap.clear()
}
