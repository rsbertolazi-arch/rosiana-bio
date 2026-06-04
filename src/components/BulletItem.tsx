interface BulletItemProps {
  children: string
}

export function BulletItem({ children }: BulletItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
      {children}
    </li>
  )
}
