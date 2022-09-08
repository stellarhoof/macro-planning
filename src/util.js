export const formatNumber = (value, options) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value)

export const formatGrams = (value) =>
  formatNumber(value, { style: "unit", unit: "gram", unitDisplay: "narrow" })

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
