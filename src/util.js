import { reaction } from "mobx"
import { useEffect } from "react"

export const formatNumber = (value, options) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value)

export const formatGrams = (value) =>
  formatNumber(value, { style: "unit", unit: "gram", unitDisplay: "narrow" })

export const genId = () => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0].toString()
}

export const useReaction = (...args) => useEffect(() => reaction(...args), [])

export const localStorage = (key, fallback = {}) => ({
  get() {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  },
  set(value) {
    window.localStorage.setItem(
      key,
      JSON.stringify(value === undefined ? fallback : value),
    )
  },
})
