import type { ReactNode } from 'react'

interface ContactLinkProps {
  href: string
  icon: ReactNode
  label: string
  value: string
  external?: boolean
}

export function ContactLink({ href, icon, label, value, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-4 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 group"
    >
      <span className="text-violet-300 group-hover:text-violet-200">{icon}</span>
      <div className="text-left">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </a>
  )
}
