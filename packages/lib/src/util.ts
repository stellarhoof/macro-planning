import { omitBy } from "es-toolkit"
import { get, set } from "es-toolkit/compat"

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

export function def<T extends object>(obj: T, path: string, value: unknown): T {
  if (!get(obj, path)) {
    return set(obj, path, value)
  }
  return obj
}

export function defaults<T>(defaults: T, obj: Partial<T>): T {
  return { ...defaults, ...omitBy(obj, (value) => value === undefined) }
}
