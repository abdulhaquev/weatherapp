import React, { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("")

  const submit = (e) => {
    e.preventDefault()
    const city = value.trim()
    if (!city) return
    onSearch(city)
    setValue("")
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 card p-2 w-full md:w-80">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search city..."
        className="w-full bg-transparent outline-none px-2 text-gray-700 placeholder:text-gray-400"
      />
      <button aria-label="Search" className="p-2 rounded-xl hover:scale-105 active:scale-95 transition">
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    </form>
  )
}