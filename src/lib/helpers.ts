/**
 * Formats a raw digit string into a Brazilian phone number pattern.
 * Examples: "11" → "(11", "1199999" → "(11) 99999", "11999991234" → "(11) 99999-1234"
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

/**
 * Strips non-digit characters and caps at 11 digits for Brazilian phone numbers.
 */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11)
}

/**
 * Builds the JSON payload for the contact form submission.
 */
export function buildFormPayload({
  name,
  phone,
  isWhatsapp,
  message,
  accessKey,
}: {
  name: string
  phone: string
  isWhatsapp: boolean
  message: string
  accessKey: string
}) {
  return {
    access_key: accessKey,
    subject: `Novo contato via site - ${name}`,
    from_name: name,
    Nome: name,
    Telefone: phone,
    WhatsApp: isWhatsapp ? 'Sim' : 'Não',
    Mensagem: message,
  }
}
