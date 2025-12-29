import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'
import { checkRateLimit } from '@/lib/rate-limit'
import { addEmail } from '@/lib/waitlist-storage'
import { sendWaitlistConfirmation } from '@/lib/email'

const waitlistSchema = z.object({
  email: z.email('Invalid email format'),
})

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // Parse and validate request body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON' },
      { status: 400 }
    )
  }

  const result = waitlistSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid email format' },
      { status: 400 }
    )
  }

  const { email } = result.data

  // Try to add email to storage
  const added = addEmail(email)
  if (!added) {
    return NextResponse.json(
      { success: false, error: 'Email already registered' },
      { status: 409 }
    )
  }

  // Send confirmation email (don't fail if email sending fails)
  try {
    await sendWaitlistConfirmation(email)
  } catch {
    // Log error but don't fail the request - avoid logging PII
    console.error('Failed to send confirmation email')
  }

  return NextResponse.json(
    { success: true, message: 'Email registered successfully' },
    { status: 201 }
  )
}
