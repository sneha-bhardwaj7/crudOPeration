"use client"

export function Dialog({ children, open, onOpenChange }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">{children}</div>
    </div>
  )
}

export function DialogTrigger({ children, asChild, ...props }) {
  return <div {...props}>{children}</div>
}

export function DialogContent({ children }) {
  return <div className="p-6">{children}</div>
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold mb-2">{children}</h2>
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>
}
