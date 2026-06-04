import { describe, it, expect } from 'vitest'
import { navItems, careerData, certifications, education, executiveTraining } from '../data'

describe('navItems', () => {
  it('contains all expected sections', () => {
    const ids = navItems.map((item) => item.id)
    expect(ids).toEqual(['home', 'about', 'expertise', 'career', 'publications', 'certifications', 'contact'])
  })

  it('every item has a non-empty label', () => {
    for (const item of navItems) {
      expect(item.label).toBeTruthy()
    }
  })
})

describe('careerData', () => {
  it('has at least one entry', () => {
    expect(careerData.length).toBeGreaterThanOrEqual(1)
  })

  it('every entry has required fields', () => {
    for (const entry of careerData) {
      expect(entry.company).toBeTruthy()
      expect(entry.role).toBeTruthy()
      expect(entry.period).toBeTruthy()
      expect(entry.logo).toBeTruthy()
      expect(entry.description).toBeTruthy()
    }
  })

  it('url is only present on entries that have one', () => {
    const withUrl = careerData.filter((e) => e.url)
    expect(withUrl.length).toBeGreaterThanOrEqual(1)
    for (const entry of withUrl) {
      expect(entry.url).toMatch(/^https?:\/\//)
    }
  })
})

describe('certifications', () => {
  it('is a non-empty array of strings', () => {
    expect(certifications.length).toBeGreaterThan(0)
    for (const cert of certifications) {
      expect(typeof cert).toBe('string')
      expect(cert.length).toBeGreaterThan(0)
    }
  })
})

describe('education', () => {
  it('every entry has degree and school', () => {
    for (const entry of education) {
      expect(entry.degree).toBeTruthy()
      expect(entry.school).toBeTruthy()
    }
  })
})

describe('executiveTraining', () => {
  it('is a non-empty array of strings', () => {
    expect(executiveTraining.length).toBeGreaterThan(0)
    for (const item of executiveTraining) {
      expect(typeof item).toBe('string')
      expect(item.length).toBeGreaterThan(0)
    }
  })
})
