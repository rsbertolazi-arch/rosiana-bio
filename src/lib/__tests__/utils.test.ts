import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('merges single class', () => {
    expect(cn('px-4')).toBe('px-4')
  })

  it('merges multiple classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('handles conditional classes via clsx', () => {
    const isHidden = false
    expect(cn('base', isHidden && 'hidden', 'flex')).toBe('base flex')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    const result = cn('px-4', 'px-8')
    expect(result).toBe('px-8')
  })

  it('handles arrays of class values', () => {
    expect(cn(['px-2', 'py-3'])).toBe('px-2 py-3')
  })

  it('handles object notation', () => {
    expect(cn({ 'text-red-500': true, 'bg-blue-500': false })).toBe('text-red-500')
  })

  it('handles undefined and null gracefully', () => {
    expect(cn(undefined, null, 'flex')).toBe('flex')
  })
})
