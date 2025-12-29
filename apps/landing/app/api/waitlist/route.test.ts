import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'

// Mock the modules
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(() => true),
}))

vi.mock('@/lib/waitlist-storage', () => ({
  addEmail: vi.fn(() => true),
}))

vi.mock('@/lib/email', () => ({
  sendWaitlistConfirmation: vi.fn(),
}))

import { checkRateLimit } from '@/lib/rate-limit'
import { addEmail } from '@/lib/waitlist-storage'
import { sendWaitlistConfirmation } from '@/lib/email'

const mockCheckRateLimit = vi.mocked(checkRateLimit)
const mockAddEmail = vi.mocked(addEmail)
const mockSendWaitlistConfirmation = vi.mocked(sendWaitlistConfirmation)

function createRequest(body: unknown, ip = '127.0.0.1'): NextRequest {
  const request = new NextRequest('http://localhost/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
  return request
}

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCheckRateLimit.mockReturnValue(true)
    mockAddEmail.mockReturnValue(true)
  })

  it('returns 201 for valid email submission', async () => {
    const request = createRequest({ email: 'test@example.com' })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Email registered successfully')
  })

  it('returns 400 for invalid email format', async () => {
    const request = createRequest({ email: 'invalid-email' })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid email format')
  })

  it('returns 400 for missing email field', async () => {
    const request = createRequest({})
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('returns 409 for duplicate email', async () => {
    mockAddEmail.mockReturnValue(false)

    const request = createRequest({ email: 'existing@example.com' })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Email already registered')
  })

  it('returns 429 when rate limited', async () => {
    mockCheckRateLimit.mockReturnValue(false)

    const request = createRequest({ email: 'test@example.com' })
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(429)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Rate limit exceeded')
  })

  it('extracts IP from x-forwarded-for header', async () => {
    const request = createRequest({ email: 'test@example.com' }, '192.168.1.1')
    await POST(request)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('192.168.1.1')
  })

  it('calls addEmail with correct email', async () => {
    const request = createRequest({ email: 'test@example.com' })
    await POST(request)

    expect(mockAddEmail).toHaveBeenCalledWith('test@example.com')
  })

  it('sends confirmation email after successful registration', async () => {
    const request = createRequest({ email: 'newuser@example.com' })
    await POST(request)

    expect(mockSendWaitlistConfirmation).toHaveBeenCalledWith('newuser@example.com')
  })

  it('does not send confirmation email if email already registered', async () => {
    mockAddEmail.mockReturnValue(false)

    const request = createRequest({ email: 'existing@example.com' })
    await POST(request)

    expect(mockSendWaitlistConfirmation).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: 'not-json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid JSON')
  })
})
