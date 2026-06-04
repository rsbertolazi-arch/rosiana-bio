interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
      <div className="text-3xl font-bold text-violet-600 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}
