import React, { useMemo } from "react"
import { toDaily, unitLabel } from "../helpers"

export default function Forecast({ forecast, unit }) {
  const days = useMemo(() => toDaily(forecast?.list || []), [forecast])

  if (!days.length) return null

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {days.map((d) => (
          <div key={d.date} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition">
            <div className="font-medium text-gray-700">
              {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              alt=""
              className="mx-auto -my-2"
            />
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{Math.round(d.max)}°</span> / {Math.round(d.min)}°{unitLabel(unit)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}