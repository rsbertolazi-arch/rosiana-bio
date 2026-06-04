import type { ReactNode } from 'react'

interface SectionBadgeProps {
  icon: ReactNode
  label: string
  variant?: 'light' | 'dark'
  className?: string
}

export function SectionBadge({ icon, label, variant = 'light', className = '' }: SectionBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium'
  const variantClasses =
    variant === 'light'
      ? 'bg-violet-100 text-violet-700'
      : 'bg-white/10 text-violet-300 backdrop-blur-sm'

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {icon}
      {label}
    </div>
  )
}
