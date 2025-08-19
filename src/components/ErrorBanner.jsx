import React, { useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"

export default function ErrorBanner({ message, onClose, autoDismiss = false, duration = 4000 }) {
  if (!message) return null

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, duration, onClose])

  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm animate-fade-in-down"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <span className="text-sm">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-red-100 transition"
        aria-label="Close error"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
