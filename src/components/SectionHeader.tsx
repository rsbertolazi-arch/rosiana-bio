import type { ReactNode } from 'react'
import { SectionBadge } from './SectionBadge'

interface SectionHeaderProps {
  icon: ReactNode
  badge: string
  title: string
  subtitle?: string
  variant?: 'light' | 'dark'
}

export function SectionHeader({ icon, badge, title, subtitle, variant = 'light' }: SectionHeaderProps) {
  const titleColor = variant === 'light' ? 'text-slate-800' : 'text-white'
  const subtitleColor = variant === 'light' ? 'text-slate-500' : 'text-slate-300'

  return (
    <div className="text-center mb-16">
      <SectionBadge icon={icon} label={badge} variant={variant} className="mb-4" />
      <h2 className={`text-4xl font-bold ${titleColor} mb-4`}>{title}</h2>
      {subtitle && (
        <p className={`text-lg ${subtitleColor} max-w-2xl mx-auto`}>{subtitle}</p>
      )}
    </div>
  )
}
