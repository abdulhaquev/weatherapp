import React from "react"

export default function Background({ theme }) {
  const cls = theme === 'rainy' ? 'rainy-bg' : theme === 'snowy' ? 'snowy-bg' : theme === 'cloudy' ? 'cloudy-bg' : 'sunny-bg'
  return <div className={`${cls} fixed inset-0 -z-10 transition-all duration-700`} />
}