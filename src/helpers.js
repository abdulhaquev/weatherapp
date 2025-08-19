export const getThemeFromWeather = (weather) => {
  if (!weather || !weather.weather || !weather.weather[0]) return "sunny"
  const main = weather.weather[0].main.toLowerCase()
  if (main.includes('rain') || main.includes('drizzle') || main.includes('thunder')) return 'rainy'
  if (main.includes('snow') || main.includes('sleet')) return 'snowy'
  if (main.includes('cloud')) return 'cloudy'
  return 'sunny'
}

export const unitLabel = (unit) => unit === 'metric' ? 'C' : 'F'
export const windLabel = (unit) => unit === 'metric' ? 'm/s' : 'mph'

export const toDaily = (list = []) => {
  const byDay = {}
  for (const item of list) {
    const d = new Date(item.dt * 1000)
    const key = d.toISOString().slice(0,10)
    if (!byDay[key]) byDay[key] = []
    byDay[key].push(item)
  }
  return Object.keys(byDay).sort().slice(0,5).map(key => {
    const bucket = byDay[key]
    let min = Infinity, max = -Infinity, icon = bucket[Math.floor(bucket.length/2)].weather[0].icon
    for (const b of bucket) { min = Math.min(min, b.main.temp_min); max = Math.max(max, b.main.temp_max) }
    return { date: key, min, max, icon }
  })
}