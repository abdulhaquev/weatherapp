import React, { useMemo } from "react"
import { motion } from "framer-motion"

/**
 * Background component
 * Renders dynamic weather-themed animated backgrounds
 * depending on the current theme prop
 */

export default function Background({ theme }) {
  // Map weather themes to gradient styles
  const gradients = {
    sunny: "from-yellow-300 via-orange-400 to-pink-500",
    rainy: "from-blue-800 via-blue-900 to-gray-900",
    snowy: "from-blue-100 via-blue-200 to-white",
    cloudy: "from-gray-400 via-gray-500 to-gray-700",
    stormy: "from-purple-800 via-indigo-900 to-black",
    default: "from-slate-400 via-slate-500 to-slate-700",
  }

  // Choose the gradient based on theme
  const gradientClass = gradients[theme] || gradients.default

  // Memoized animated elements
  const AnimatedElements = useMemo(() => {
    switch (theme) {
      case "rainy":
        return <RainLayer />
      case "snowy":
        return <SnowLayer />
      case "cloudy":
        return <CloudLayer />
      case "stormy":
        return <StormLayer />
      case "sunny":
        return <SunRays />
      default:
        return null
    }
  }, [theme])

  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-all duration-1000`}
      />

      {/* Overlay animations */}
      {AnimatedElements}

      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
    </div>
  )
}

/* ☀️ Sunny - glowing rays */
function SunRays() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 blur-3xl opacity-70"
    />
  )
}

/* 🌧️ Rainy - falling drops */
function RainLayer() {
  const drops = Array.from({ length: 40 })
  return (
    <div className="absolute inset-0 overflow-hidden">
      {drops.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: Math.random() * 1.5 + 1,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute top-0 left-0 w-[2px] h-10 bg-blue-300/70 rounded-full"
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  )
}

/* ❄️ Snowy - falling flakes */
function SnowLayer() {
  const flakes = Array.from({ length: 30 })
  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "100vh", opacity: [0.8, 1, 0.8], x: [0, 10, -10, 0] }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute top-0 text-white text-lg select-none"
          style={{ left: `${Math.random() * 100}%` }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  )
}

/* ☁️ Cloudy - drifting clouds */
function CloudLayer() {
  const clouds = Array.from({ length: 5 })
  return (
    <div className="absolute inset-0 overflow-hidden">
      {clouds.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-20%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: Math.random() * 30 + 40,
            repeat: Infinity,
            delay: i * 8,
          }}
          className="absolute top-[20%] w-[200px] h-[100px] bg-white/60 rounded-full blur-2xl"
          style={{
            top: `${Math.random() * 60 + 10}%`,
            height: `${Math.random() * 80 + 60}px`,
            width: `${Math.random() * 200 + 150}px`,
          }}
        />
      ))}
    </div>
  )
}

/* 🌩️ Stormy - flashes of lightning */
function StormLayer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
      className="absolute inset-0 bg-white/80 mix-blend-overlay"
    />
  )
}
