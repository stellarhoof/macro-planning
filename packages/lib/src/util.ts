export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value)
}

export function formatGrams(value: number) {
  return formatNumber(value, {
    style: "unit",
    unit: "gram",
    unitDisplay: "narrow",
  })
}

export function getNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function startCase(s: string) {
  const result = s.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1)
}
