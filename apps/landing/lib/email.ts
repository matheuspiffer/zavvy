import { Resend } from 'resend'

// Lazy initialization to avoid build-time errors when API key is not set
let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

export async function sendWaitlistConfirmation(email: string) {
  const resend = getResendClient()

  // Skip sending if no API key (development mode)
  if (!resend) {
    console.log('[DEV] Would send confirmation email to:', email)
    return
  }

  await resend.emails.send({
    from: 'Zavvy <noreply@zavvy.app>',
    to: email,
    subject: 'Bem-vindo à lista de espera da Zavvy!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #10B981; font-size: 24px; margin-bottom: 16px;">Você está na lista! 🎉</h1>
        <p style="margin-bottom: 16px;">Obrigado por se inscrever na lista de espera da Zavvy.</p>
        <p style="margin-bottom: 16px;">Você será um dos primeiros a saber quando estivermos prontos para lançar.</p>
        <p style="margin-bottom: 24px;">Fique de olho no seu email!</p>
        <p style="color: #6B7280;">— Equipe Zavvy</p>
      </body>
      </html>
    `,
  })
}
