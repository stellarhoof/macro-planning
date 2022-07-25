// If the date object is invalid it will return 'NaN' on getTime() and NaN is
// never equal to itself.
export const isValidDate = (x) => x.getTime() === x.getTime()

export const formatDate = (value, options) =>
  new Intl.DateTimeFormat("en-US", options).format(value)

export const formatNumber = (value, options) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value)

export const formatGrams = (value) =>
  formatNumber(value, { style: "unit", unit: "gram", unitDisplay: "narrow" })

export const addDays = (days, date) => date.setDate(date.getDate() + days)

export const genId = () => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0].toString()
}

export const sum = (arr) => arr.reduce((acc, val) => acc + val, 0)

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
