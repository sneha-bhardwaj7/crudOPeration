export function Badge({ children, className = "" }) {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </div>
  )
}
