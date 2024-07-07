import * as edgedb from "edgedb"

import { defaults, formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui/TanstackDataTable.tsx"
import type { Food } from "../../../dbschema/interfaces.ts"
import { Actions } from "./Actions.tsx"

import type { LoaderFunctionArgs } from "@remix-run/node"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRef } from "react"

import { useLoaderData } from "@remix-run/react"
import typia from "typia"
import {
  type PaginationSearchParams,
  useSearchParamsPagination,
} from "#src/util/useSearchParamsPagination.ts"
import {
  type SortingSearchParams,
  useSearchParamsTanstackSorting,
} from "#src/util/useSearchParamsTanstackSorting.ts"
import { Button } from "#ui/rats/buttons/Button.tsx"

const client = edgedb.createClient()

interface SearchParams extends PaginationSearchParams, SortingSearchParams {}

const searchParamsDefaults: SearchParams = {
  page: 0,
  pageSize: 10,
  orderBy: "name",
  orderDir: "asc",
}

function parseSearchParams(searchParams: URLSearchParams): SearchParams {
  const parsed = typia.http.query<{
    pageSize: number
    page: number
    orderBy: string
    orderDir: "asc" | "desc"
  }>(searchParams)
  return defaults(searchParamsDefaults, parsed)
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url)

  const { page, pageSize, orderBy, orderDir } = parseSearchParams(searchParams)

  const query = `
    with
      remaining := (select Food order by .${orderBy} ${orderDir} offset ${page * pageSize}),
      results := (select remaining limit ${pageSize})
    select {
      items := results {*},
      hasPreviousPage := ${page} > 0,
      hasNextPage := count(remaining) > ${pageSize}
    }
  `

  const result = await client.querySingle<{
    items: Food[]
    hasPreviousPage: boolean
    hasNextPage: boolean
  }>(query)

  const defaultResult = {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
  }

  return result ?? defaultResult
}

const columnHelper = createColumnHelper<Food>()

const columns = [
  columnHelper.accessor("name", {
    meta: {
      props: { header: { isRowHeader: true } },
    },
  }),
  columnHelper.accessor("brand", {}),
  columnHelper.accessor("fats", {
    cell: ({ getValue }) => formatGrams(getValue()),
  }),
  columnHelper.accessor("carbs", {
    cell: ({ getValue }) => formatGrams(getValue()),
  }),
  columnHelper.accessor("proteins", {
    cell: ({ getValue }) => formatGrams(getValue()),
  }),
  columnHelper.accessor("calories", {
    cell: ({ getValue }) => formatNumber(getValue()),
  }),
  columnHelper.display({
    id: "actions",
    cell: (ctx) => <Actions {...ctx} />,
  }),
]

// See https://news.ycombinator.com/item?id=30376689
export default function Foods() {
  const ref = useRef<HTMLTableElement>(null)

  const data = useLoaderData<typeof loader>()

  const [onPreviousPage, onNextPage] =
    useSearchParamsPagination(searchParamsDefaults)

  const [sorting, setSorting] =
    useSearchParamsTanstackSorting(searchParamsDefaults)

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <>
      <TanstackDataTable
        ref={ref}
        aria-label="Foods"
        selectionMode="single"
        table={table}
        sorting={sorting}
      />
      <Button isDisabled={!data.hasPreviousPage} onPress={onPreviousPage}>
        Prev Page
      </Button>
      <Button isDisabled={!data.hasNextPage} onPress={onNextPage}>
        Next Page
      </Button>
    </>
  )
}
