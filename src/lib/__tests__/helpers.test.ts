import { describe, it, expect } from 'vitest'
import { formatPhone, sanitizePhoneInput, buildFormPayload } from '../helpers'

describe('formatPhone', () => {
  it('returns empty string for empty input', () => {
    expect(formatPhone('')).toBe('')
  })

  it('returns empty string for non-digit input', () => {
    expect(formatPhone('abc')).toBe('')
  })

  it('formats 1 digit: opening paren', () => {
    expect(formatPhone('1')).toBe('(1')
  })

  it('formats 2 digits: area code', () => {
    expect(formatPhone('11')).toBe('(11')
  })

  it('formats 3 digits', () => {
    expect(formatPhone('119')).toBe('(11) 9')
  })

  it('formats 6 digits', () => {
    expect(formatPhone('119999')).toBe('(11) 9999')
  })

  it('formats 7 digits (landline prefix)', () => {
    expect(formatPhone('1199999')).toBe('(11) 9999-9')
  })

  it('formats 10 digits (landline)', () => {
    expect(formatPhone('1199991234')).toBe('(11) 9999-1234')
  })

  it('formats 11 digits (mobile)', () => {
    expect(formatPhone('11999991234')).toBe('(11) 99999-1234')
  })

  it('strips non-digit characters before formatting', () => {
    expect(formatPhone('(11) 99999-1234')).toBe('(11) 99999-1234')
  })

  it('handles input longer than 11 digits by ignoring extras', () => {
    expect(formatPhone('119999912345678')).toBe('(11) 99999-1234')
  })
})

describe('sanitizePhoneInput', () => {
  it('strips non-digit characters', () => {
    expect(sanitizePhoneInput('(11) 99999-1234')).toBe('11999991234')
  })

  it('caps at 11 digits', () => {
    expect(sanitizePhoneInput('119999912349999')).toBe('11999991234')
  })

  it('returns empty string for empty input', () => {
    expect(sanitizePhoneInput('')).toBe('')
  })

  it('returns empty string for non-digit input', () => {
    expect(sanitizePhoneInput('abc')).toBe('')
  })
})

describe('buildFormPayload', () => {
  const baseArgs = {
    name: 'Maria',
    phone: '(11) 99999-1234',
    isWhatsapp: true,
    message: 'Olá!',
    accessKey: 'test-key',
  }

  it('builds payload with correct fields', () => {
    const payload = buildFormPayload(baseArgs)
    expect(payload).toEqual({
      access_key: 'test-key',
      subject: 'Novo contato via site - Maria',
      from_name: 'Maria',
      Nome: 'Maria',
      Telefone: '(11) 99999-1234',
      WhatsApp: 'Sim',
      Mensagem: 'Olá!',
    })
  })

  it('sets WhatsApp to "Não" when isWhatsapp is false', () => {
    const payload = buildFormPayload({ ...baseArgs, isWhatsapp: false })
    expect(payload.WhatsApp).toBe('Não')
  })

  it('includes the name in the subject line', () => {
    const payload = buildFormPayload({ ...baseArgs, name: 'João' })
    expect(payload.subject).toBe('Novo contato via site - João')
  })
})
