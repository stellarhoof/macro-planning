import { useSearchParams } from "@remix-run/react"
import { mapValues } from "radashi"

export type UseParsedSearchParams<T> = [T, (searchParams: T) => void]

export function useParsedSearchParams<T extends object>(
  parse: (searchParams: URLSearchParams) => T,
): UseParsedSearchParams<T> {
  const [searchParams, setSearchParams] = useSearchParams()

  const parsedSearchParams = {
    ...Object.fromEntries(searchParams.entries()),
    ...parse(searchParams),
  }

  function setParsedSearchParams(parsedSearchParams: T) {
    setSearchParams(mapValues(parsedSearchParams, (value) => `${value}`))
  }

  return [parsedSearchParams, setParsedSearchParams]
}
