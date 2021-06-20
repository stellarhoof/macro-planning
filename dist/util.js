// If the date object is invalid it will return 'NaN' on getTime() and NaN is
// never equal to itself.
export let isValidDate = x => x.getTime() === x.getTime()

export let formatDate = (x, options) =>
  new Intl.DateTimeFormat('en-US', options).format(x)

export let formatNumber = (x, options) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    ...options,
  }).format(x)

export let formatGrams = x =>
  formatNumber(x, { style: 'unit', unit: 'gram', unitDisplay: 'narrow' })

export let addDays = (days, date) =>
  new Date(date).setDate(date.getDate() + days)

export let genId = () => {
  let array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0].toString()
}

export let sum = arr => arr.reduce((acc, val) => acc + val, 0)
