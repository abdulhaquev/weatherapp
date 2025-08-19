import React, { useState, useEffect, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"

/**
 * SearchBar Component
 *
 * Props:
 *  - onSearch: function(city: string)
 *  - variant: "simple" | "rounded" | "glass"
 *  - loading: boolean (if true, shows spinner)
 *  - helperText: string (small text under input)
 *  - autoFocus: boolean (focus input on mount)
 *  - allowClear: boolean (default: true)
 */
export default function SearchBar({
  onSearch,
  variant = "simple",
  loading = false,
  helperText = "Press Enter to search",
  autoFocus = false,
  allowClear = true,
}) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  // Autofocus when component mounts
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Keyboard shortcut: Ctrl+K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const city = value.trim()
    if (!city) {
      setError("Please enter a city name")
      return
    }
    setError("")
    onSearch(city)
    setValue("")
  }

  const clear = () => {
    setValue("")
    setError("")
    inputRef.current?.focus()
  }

  // Styling variants
  const baseStyle =
    "flex items-center gap-2 w-full md:w-80 px-3 py-2 transition focus-within:ring-2"
  const variantStyle =
    variant === "rounded"
      ? "rounded-full bg-white shadow"
      : variant === "glass"
      ? "rounded-xl bg-white/30 backdrop-blur-md border border-white/40"
      : "rounded-xl bg-white shadow"

  return (
    <form
      onSubmit={submit}
      className={`card ${baseStyle} ${variantStyle}`}
    >
      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search city..."
        className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
        aria-label="City name"
      />

      {/* Clear button */}
      {allowClear && value && !loading && (
        <button
          type="button"
          onClick={clear}
          className="p-1 rounded-md hover:bg-gray-100 transition"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}

      {/* Submit button */}
      <button
        aria-label="Search"
        disabled={loading}
        className="p-2 rounded-xl hover:scale-105 active:scale-95 transition disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
        ) : (
          <Search className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Error message */}
      {error && (
        <p className="absolute top-full mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <p className="absolute top-full mt-1 text-xs text-gray-400">
          {helperText}
        </p>
      )}
    </form>
  )
}
