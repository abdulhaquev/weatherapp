import React from "react"

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-12 h-12 rounded-full border-4 border-white/70 border-t-transparent animate-spin"></div>
    </div>
  )
}