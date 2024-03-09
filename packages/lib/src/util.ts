import * as R from "ramda"

export function callOrReturn<T>(
  fn: T | ((...args: any[]) => T),
  ...args: any[]
): T {
  return typeof fn === "function" ? (fn as any)(...args) : fn
}

export function keyBy<T extends { [k: string]: any }>(
  key: string,
  arr: T[],
): Record<string, T> {
  return R.pipe(
    R.groupBy((x: T) => x[key]),
    R.mapObjIndexed((x) => R.head(x!)!),
  )(arr)
}

export function formatNumber(value: number, options: Intl.NumberFormatOptions) {
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

export function genId() {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0]!.toString()
}
