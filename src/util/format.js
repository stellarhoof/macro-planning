export const formatNumber = (value, options) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value)

export const formatGrams = (value) =>
  formatNumber(value, { style: "unit", unit: "gram", unitDisplay: "narrow" })
