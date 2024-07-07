import typia from "typia"
import { defaults } from "#lib/util.ts"
import { useParsedSearchParams } from "#src/util/useParsedSearchParams.ts"

export interface PaginationSearchParams {
  page: number
  pageSize: number
}

export type UseSearchParamsPagination = [() => void, () => void]

export function useSearchParamsPagination({
  page,
  pageSize,
}: PaginationSearchParams): UseSearchParamsPagination {
  const [searchParams, setSearchParams] = useParsedSearchParams(
    (searchParams) => {
      const parsed = typia.http.query<PaginationSearchParams>(searchParams)
      return defaults({ page, pageSize }, parsed)
    },
  )
  return [
    () => {
      setSearchParams({ ...searchParams, page: searchParams.page - 1 })
    },
    () => {
      setSearchParams({ ...searchParams, page: searchParams.page + 1 })
    },
  ]
}
