import { Download } from 'lucide-react'

interface EbookCardProps {
  href: string
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  gradientClasses?: string
}

export function EbookCard({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  gradientClasses = 'from-violet-100 to-indigo-100',
}: EbookCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100 hover:border-violet-200 hover:-translate-y-1"
    >
      <div className={`flex items-center justify-center p-6 bg-gradient-to-br ${gradientClasses}`}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-64 rounded-lg shadow-lg"
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-slate-800 mb-2">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-3">{description}</p>
        <span className="inline-flex items-center gap-1 text-violet-600 text-sm font-medium">
          <Download className="w-4 h-4" />
          Baixar e-Book
        </span>
      </div>
    </a>
  )
}
