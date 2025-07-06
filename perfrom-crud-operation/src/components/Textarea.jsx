"use client"

export function Textarea({ className = "", placeholder = "", value = "", onChange, id, ...props }) {
  return (
    <textarea
      id={id}
      className={`flex min-h-20 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}
