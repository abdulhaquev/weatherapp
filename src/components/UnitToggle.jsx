import React from "react"

export default function UnitToggle({ unit, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="card py-2 px-4 font-medium hover:shadow-lg transition active:scale-[.98]"
      title="Toggle °C/°F"
    >
      {unit === 'metric' ? '°C' : '°F'}
    </button>
  )
}