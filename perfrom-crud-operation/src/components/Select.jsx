"use client"

export function Select({ children, value, onValueChange }) {
  return <div className="relative">{children}</div>
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }) {
  return (
    <div className="absolute top-full left-0 z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      {children}
    </div>
  )
}

export function SelectItem({ children, value, onClick }) {
  return (
    <div className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100" onClick={() => onClick && onClick(value)}>
      {children}
    </div>
  )
}
