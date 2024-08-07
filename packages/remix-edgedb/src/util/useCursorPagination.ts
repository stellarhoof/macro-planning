import { useLoaderData } from "@remix-run/react"
import typia from "typia"
import { useParsedSearchParams } from "#src/util/useParsedSearchParams.ts"

export interface CursorPaginationSearchParams {
  cursor: string
  limit: number
}

export interface CursorPaginationData {
  pagination: {
    curCursor: string | null
    prevCursor: string | null
    nextCursor: string | null
  }
  items: unknown[]
}

export function useCursorPagination<T extends CursorPaginationData>() {
  const data = useLoaderData<T>()

  const [searchParams, setSearchParams] = useParsedSearchParams(
    typia.http.createQuery<CursorPaginationSearchParams>(),
  )

  return {
    items: data.items as T["items"],
    hasPrevious: data.pagination.prevCursor !== null,
    hasNext: data.pagination.nextCursor !== null,
    onPrevious() {
      if (data.pagination.prevCursor) {
        setSearchParams({
          ...searchParams,
          cursor: data.pagination.prevCursor,
        })
      }
    },
    onNext() {
      if (data.pagination.nextCursor) {
        setSearchParams({
          ...searchParams,
          cursor: data.pagination.nextCursor,
        })
      }
    },
  }
}
