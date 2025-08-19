import React, { useMemo } from "react"
import { toDaily, unitLabel } from "../helpers"
import { motion } from "framer-motion"
import { Info } from "lucide-react"

/**
 * Forecast component
 * Shows a 5-day (or more) forecast in a responsive grid with icons, temperatures, and extra UI.
 */
export default function Forecast({ forecast, unit }) {
  // Convert API forecast list to daily summaries
  const days = useMemo(() => toDaily(forecast?.list || []), [forecast])

  if (!days.length) return null

  return (
    <section className="card p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 drop-shadow-sm">
          5-Day Forecast
        </h3>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Data from OpenWeatherMap</span>
        </div>
      </div>

      {/* Grid of forecast days */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {days.map((d, index) => (
          <motion.div
            key={d.date}
            className="bg-gradient-to-b from-white to-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Date */}
            <div className="font-medium text-gray-700 mb-2">
              {new Date(d.date).toLocaleDateString(undefined, { weekday: "short" })}
            </div>

            {/* Weather icon */}
            <motion.img
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              alt={d.description || "Weather icon"}
              className="mx-auto -my-2 drop-shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />

            {/* Temps */}
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-900 text-base">
                {Math.round(d.max)}°
              </span>{" "}
              / {Math.round(d.min)}°{unitLabel(unit)}
            </div>

            {/* Weather description (tooltip on hover) */}
            <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[11px] py-1 opacity-0 group-hover:opacity-100 transition">
              {d.description}
            </div>

            {/* Mini temp bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-red-400"
                style={{
                  width: `${Math.max(20, Math.min(100, (d.max / 40) * 100))}%`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />

      {/* Extended section: summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Average temperature card */}
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Avg Temp</h4>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(
              days.reduce((acc, d) => acc + (d.max + d.min) / 2, 0) / days.length
            )}
            °{unitLabel(unit)}
          </p>
        </div>

        {/* Warmest day */}
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Warmest Day</h4>
          <p className="text-lg font-medium text-gray-800">
            {
              days.reduce((a, b) => (a.max > b.max ? a : b))
                .date
            }
          </p>
          <p className="text-2xl font-bold text-red-500">
            {Math.round(days.reduce((a, b) => (a.max > b.max ? a : b)).max)}°
          </p>
        </div>

        {/* Coldest day */}
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Coldest Day</h4>
          <p className="text-lg font-medium text-gray-800">
            {
              days.reduce((a, b) => (a.min < b.min ? a : b))
                .date
            }
          </p>
          <p className="text-2xl font-bold text-blue-500">
            {Math.round(days.reduce((a, b) => (a.min < b.min ? a : b)).min)}°
          </p>
        </div>
      </div>

      {/* Scrolling hourly preview (optional) */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Hourly Trend (Next 24h)
        </h4>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {(forecast?.list || []).slice(0, 8).map((hour, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-20 bg-white rounded-xl p-3 text-center shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="text-xs text-gray-600">
                {new Date(hour.dt * 1000).getHours()}:00
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt=""
                className="mx-auto"
              />
              <div className="text-sm font-medium text-gray-900">
                {Math.round(hour.main.temp)}°
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                              EXTRA STYLES (CSS)                            */
/*   These would go into your Tailwind/custom.css or global styles if needed  */
/* -------------------------------------------------------------------------- */

/*
.card {
  border-radius: 1rem;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
}
*/

/*
Tooltip handled by group-hover in Tailwind.
Animations handled by framer-motion.
Hourly cards scroll horizontally on small screens.
*/

/*
Future improvements:
- Add precipitation probability bars
- Show wind speed and humidity per day
- Animate background of cards per weather type
*/
