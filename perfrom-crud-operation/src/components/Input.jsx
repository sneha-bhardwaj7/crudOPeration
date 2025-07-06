"use client"

export function Input({ className = "", placeholder = "", value = "", onChange, id, ...props }) {
  return (
    <input
      id={id}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}
