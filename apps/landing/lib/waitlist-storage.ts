// In-memory storage for waitlist emails (MVP - upgrade to DB later)
const waitlistEmails = new Set<string>()

export function addEmail(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim()

  if (waitlistEmails.has(normalizedEmail)) {
    return false // Already exists
  }

  waitlistEmails.add(normalizedEmail)
  return true // Successfully added
}

export function hasEmail(email: string): boolean {
  return waitlistEmails.has(email.toLowerCase().trim())
}

// For testing purposes
export function clearEmails(): void {
  waitlistEmails.clear()
}

export function getEmailCount(): number {
  return waitlistEmails.size
}
