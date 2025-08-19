import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { Thermometer, ThermometerSnowflake, ThermometerSun } from "lucide-react"

/**
 * UnitToggle
 *
 * Props:
 * - unit: "metric" | "imperial" | "standard"
 * - onToggle: function(newUnit)
 * - variant: "button" | "switch" | "segmented"
 */
export default function UnitToggle({ unit = "metric", onToggle, variant = "button" }) {
  // Handle keyboard shortcut "U" to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "u") {
        e.preventDefault()
        cycleUnit()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  const cycleUnit = () => {
    const order = ["metric", "imperial", "standard"]
    const idx = order.indexOf(unit)
    const next = order[(idx + 1) % order.length]
    onToggle(next)
  }

  const renderLabel = () => {
    if (unit === "metric") return "°C"
    if (unit === "imperial") return "°F"
    return "K"
  }

  const renderIcon = () => {
    if (unit === "metric") return <ThermometerSnowflake className="w-4 h-4" />
    if (unit === "imperial") return <ThermometerSun className="w-4 h-4" />
    return <Thermometer className="w-4 h-4" />
  }

  if (variant === "button") {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={cycleUnit}
        className="card flex items-center gap-2 py-2 px-4 font-medium hover:shadow-lg transition"
        title="Toggle °C/°F/K (shortcut: U)"
        aria-label="Toggle temperature unit"
      >
        {renderIcon()}
        {renderLabel()}
      </motion.button>
    )
  }

  if (variant === "switch") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">°C</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={unit === "imperial"}
            onChange={() => cycleUnit()}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm text-gray-600">°F</span>
      </div>
    )
  }

  if (variant === "segmented") {
    return (
      <div className="flex items-center rounded-xl border bg-white shadow-sm overflow-hidden">
        {["metric", "imperial", "standard"].map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-4 py-2 text-sm font-medium transition ${
              unit === opt
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {opt === "metric" ? "°C" : opt === "imperial" ? "°F" : "K"}
          </button>
        ))}
      </div>
    )
  }

  return null
}
