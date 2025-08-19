import React from "react"
import { unitLabel, windLabel } from "../helpers"

export default function WeatherCard({ weather, unit }) {
  if (!weather) return null
  const { name, sys, main, weather: wArr, wind } = weather
  const icon = wArr?.[0]?.icon
  const description = wArr?.[0]?.description

  return (
    <div className="card p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">{name}, {sys?.country}</h2>

      <div className="flex items-center justify-center gap-4 mt-2">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || 'weather icon'}
            className="w-16 h-16"
          />
        )}
        <div className="text-5xl font-semibold text-gray-900">
          {Math.round(main?.temp)}°{unitLabel(unit)}
        </div>
      </div>

      <p className="capitalize text-gray-600 mt-1">{description}</p>

      <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-700">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="font-semibold">Humidity</div>
          <div className="text-gray-900 mt-1">{main?.humidity}%</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="font-semibold">Wind</div>
          <div className="text-gray-900 mt-1">{Math.round(wind?.speed)} {windLabel(unit)}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="font-semibold">Pressure</div>
          <div className="text-gray-900 mt-1">{main?.pressure} hPa</div>
        </div>
      </div>
    </div>
  )
}