"use client"

import { useState } from "react"

export function SimpleSelect({ value, onValueChange, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="capitalize">{value.replace("-", " ")}</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg mt-1">
          {children.map((child, index) => (
            <div
              key={index}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 capitalize"
              onClick={() => handleSelect(child.props.value)}
            >
              {child.props.children}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function SimpleSelectItem({ value, children }) {
  return null // This is just for structure, actual rendering happens in SimpleSelect
}
