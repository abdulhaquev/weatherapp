import React from "react"

/**
 * Loader component
 * Variants: spinner | dots | bars | pulse
 * Props:
 *  - variant: string
 *  - size: number (px)
 *  - color: tailwind class (default: "border-white/70")
 *  - fullscreen: boolean (if true, shows overlay)
 *  - message: string (optional text under loader)
 */
export default function Loader({
  variant = "spinner",
  size = 48,
  color,
  fullscreen = false,
  message,
}) {
  const colorClass = color || "border-white/70"

  // Loader UI
  const renderLoader = () => {
    if (variant === "spinner") {
      return (
        <div
          className={`rounded-full border-4 ${colorClass} border-t-transparent animate-spin`}
          style={{ width: size, height: size }}
        />
      )
    }

    if (variant === "dots") {
      return (
        <div className="flex items-center justify-center gap-2">
          <span className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 bg-white/70 rounded-full animate-bounce" />
        </div>
      )
    }

    if (variant === "bars") {
      return (
        <div className="flex items-end justify-center gap-1">
          <span className="w-2 h-4 bg-white/70 animate-pulse [animation-delay:-0.2s]" />
          <span className="w-2 h-6 bg-white/70 animate-pulse [animation-delay:-0.1s]" />
          <span className="w-2 h-8 bg-white/70 animate-pulse" />
          <span className="w-2 h-6 bg-white/70 animate-pulse [animation-delay:0.1s]" />
          <span className="w-2 h-4 bg-white/70 animate-pulse [animation-delay:0.2s]" />
        </div>
      )
    }

    if (variant === "pulse") {
      return (
        <div
          className="rounded-full bg-white/70 animate-ping"
          style={{ width: size, height: size }}
        />
      )
    }

    return null
  }

  // Wrapper (fullscreen overlay or inline)
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
        {renderLoader()}
        {message && <p className="mt-4 text-white/90 text-sm">{message}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {renderLoader()}
      {message && <p className="mt-4 text-white/80 text-sm">{message}</p>}
    </div>
  )
}
