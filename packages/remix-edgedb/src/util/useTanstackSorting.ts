import type { SortingState, Updater } from "@tanstack/react-table"
import typia from "typia"
import { defaults } from "#lib/util.ts"
import { useParsedSearchParams } from "#src/util/useParsedSearchParams.ts"

export interface SortingSearchParams {
  orderBy: string
  orderDir: "asc" | "desc"
}

export type UseTanstackSorting = [
  SortingState,
  (updater: Updater<SortingState>) => void,
]

export function useTanstackSorting({
  orderBy,
  orderDir,
}: SortingSearchParams): UseTanstackSorting {
  const [searchParams, setSearchParams] = useParsedSearchParams(
    (searchParams) => {
      const parsed = typia.http.query<SortingSearchParams>(searchParams)
      return defaults({ orderBy, orderDir }, parsed)
    },
  )

  const sorting = [
    {
      id: searchParams.orderBy,
      desc: searchParams.orderDir === "desc",
    },
  ]

  function setSorting(updater: Updater<SortingState>) {
    if (Array.isArray(updater)) {
      const sorting = updater[0]
      if (sorting) {
        setSearchParams({
          ...searchParams,
          orderBy: sorting.id,
          orderDir: sorting.desc ? "desc" : "asc",
        })
      }
    }
  }

  return [sorting, setSorting]
}
