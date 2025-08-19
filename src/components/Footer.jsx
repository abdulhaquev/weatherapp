import React from "react"
import { Github, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-white/90 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium drop-shadow">Developed by Abdul Haque</p>
        <p className="text-[11px] opacity-75"></p>

        {/* Social links */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/abdulhaquev/weatherapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs hover:text-white transition"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs hover:text-white transition"
          >
            <Globe className="w-4 h-4" /> OpenWeather
          </a>
        </div>
      </div>
    </footer>
  )
}
