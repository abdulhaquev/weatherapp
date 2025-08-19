
import React, { useEffect, useMemo, useState } from "react"
import SearchBar from "./components/SearchBar.jsx"
import WeatherCard from "./components/WeatherCard.jsx"
import Forecast from "./components/Forecast.jsx"
import Background from "./components/Background.jsx"
import ErrorBanner from "./components/ErrorBanner.jsx"
import UnitToggle from "./components/UnitToggle.jsx"
import Footer from "./components/Footer.jsx"
import Loader from "./components/Loader.jsx"

import { getCurrentByCity, getCurrentByCoords, getForecastByCity, getForecastByCoords } from "./api"
import { getThemeFromWeather } from "./helpers"

export default function App() {
  const [unit, setUnit] = useState('metric')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        await new Promise((resolve, reject) => {
          if (!navigator.geolocation) return reject(new Error('Geolocation not supported'))
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
        }).then(async (pos) => {
          const { latitude, longitude } = pos.coords
          const w = await getCurrentByCoords(latitude, longitude, unit)
          const f = await getForecastByCoords(latitude, longitude, unit)
          setWeather(w); setForecast(f); setError('')
        }).catch(async () => {
          const fallback = 'London'
          const w = await getCurrentByCity(fallback, unit)
          const f = await getForecastByCity(fallback, unit)
          setWeather(w); setForecast(f); setError('Location permission denied. Showing London.')
        })
      } catch (e) {
        setError(e.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (!weather) return
    const refetch = async () => {
      try {
        setLoading(true)
        const { coord, name } = weather
        if (coord?.lat && coord?.lon) {
          const w = await getCurrentByCoords(coord.lat, coord.lon, unit)
          const f = await getForecastByCoords(coord.lat, coord.lon, unit)
          setWeather(w); setForecast(f)
        } else if (name) {
          const w = await getCurrentByCity(name, unit)
          const f = await getForecastByCity(name, unit)
          setWeather(w); setForecast(f)
        }
        setError('')
      } catch (e) {
        setError(e.message || 'Failed to switch units')
      } finally {
        setLoading(false)
      }
    }
    refetch()
  }, [unit])

  const onSearch = async (city) => {
    try {
      setLoading(true); setError('')
      const w = await getCurrentByCity(city, unit)
      const f = await getForecastByCity(city, unit)
      setWeather(w); setForecast(f)
    } catch (e) {
      setError('Invalid city or API error.')
    } finally {
      setLoading(false)
    }
  }

  const theme = useMemo(() => getThemeFromWeather(weather), [weather])

  return (
    <div className="relative min-h-screen w-full">
      <Background theme={theme} />

      <div className="absolute inset-0 container py-6 md:py-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
            Weather <span className="opacity-75">· </span>
          </h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar onSearch={onSearch} />
            <UnitToggle unit={unit} onToggle={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')} />
          </div>
        </div>

        {error && <ErrorBanner message={error} onClose={() => setError('')} />}

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 fade-in">
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} unit={unit} />
            </div>
            <div className="lg:col-span-3">
              <Forecast forecast={forecast} unit={unit} />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}