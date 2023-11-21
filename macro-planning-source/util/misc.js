export const genId = () => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0].toString()
}

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
