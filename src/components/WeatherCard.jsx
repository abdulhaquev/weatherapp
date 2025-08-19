import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Droplets,
  Wind,
  Gauge,
  ThermometerSun,
  Eye,
  Sun,
  Moon,
  Cloud,
  MapPin
} from "lucide-react"
import { unitLabel, windLabel } from "../helpers"

/**
 * WeatherCard Component
 * 
 * Props:
 * - weather: OpenWeatherMap API response
 * - unit: "metric" | "imperial"
 * - mode: "compact" | "detailed"
 */
export default function WeatherCard({ weather, unit, mode = "detailed" }) {
  const [flipped, setFlipped] = useState(false)

  if (!weather) return null

  const { name, sys, main, weather: wArr, wind, visibility, clouds } = weather
  const icon = wArr?.[0]?.icon
  const description = wArr?.[0]?.description
  const feelsLike = main?.feels_like

  // Format sunrise/sunset if available
  const formatTime = (ts) =>
    ts ? new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="card p-6 text-center relative cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
      aria-label="Weather information card"
      role="region"
    >
      <AnimatePresence mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              {name}, {sys?.country}
            </h2>

            {/* Temperature + Icon */}
            <div className="flex items-center justify-center gap-4 mt-2">
              {icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description || "weather icon"}
                  className="w-16 h-16"
                />
              )}
              <div className="text-5xl font-semibold text-gray-900">
                {Math.round(main?.temp)}°{unitLabel(unit)}
              </div>
            </div>

            {/* Description */}
            <p className="capitalize text-gray-600">{description}</p>

            {/* Extra info */}
            {mode === "compact" ? (
              <div className="text-sm text-gray-700">
                Feels like {Math.round(feelsLike)}°{unitLabel(unit)}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-700">
                <MetricBox
                  icon={<Droplets className="w-4 h-4 text-blue-500" />}
                  label="Humidity"
                  value={`${main?.humidity}%`}
                />
                <MetricBox
                  icon={<Wind className="w-4 h-4 text-teal-500" />}
                  label="Wind"
                  value={`${Math.round(wind?.speed)} ${windLabel(unit)}`}
                />
                <MetricBox
                  icon={<Gauge className="w-4 h-4 text-gray-500" />}
                  label="Pressure"
                  value={`${main?.pressure} hPa`}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              More Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <MetricBox
                icon={<ThermometerSun className="w-4 h-4 text-orange-500" />}
                label="Feels Like"
                value={`${Math.round(feelsLike)}°${unitLabel(unit)}`}
              />
              <MetricBox
                icon={<Eye className="w-4 h-4 text-indigo-500" />}
                label="Visibility"
                value={`${(visibility / 1000).toFixed(1)} km`}
              />
              <MetricBox
                icon={<Cloud className="w-4 h-4 text-gray-400" />}
                label="Cloudiness"
                value={`${clouds?.all || 0}%`}
              />
              <MetricBox
                icon={<Sun className="w-4 h-4 text-yellow-500" />}
                label="Sunrise"
                value={formatTime(sys?.sunrise)}
              />
              <MetricBox
                icon={<Moon className="w-4 h-4 text-purple-500" />}
                label="Sunset"
                value={formatTime(sys?.sunset)}
              />
            </div>
            <p className="text-xs text-gray-400">
              Tap card again to flip back
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * MetricBox - reusable mini card for a metric
 */
function MetricBox({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 font-medium text-gray-700">
        {icon}
        {label}
      </div>
      <div className="text-gray-900 mt-1">{value}</div>
    </div>
  )
}
