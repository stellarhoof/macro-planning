import * as edgedb from "edgedb"

import { defaults, formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui/TanstackDataTable.tsx"
import type { Food } from "../../../dbschema/interfaces.ts"
import { Actions } from "./Actions.tsx"

import type { LoaderFunctionArgs, SerializeFrom } from "@remix-run/node"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRef } from "react"

import typia from "typia"
import { useCursorPagination } from "#src/util/useCursorPagination.ts"
import { useTanstackSorting } from "#src/util/useTanstackSorting.ts"
import { Button } from "#ui/rats/buttons/Button.tsx"

const client = edgedb.createClient()

// Typia doesn't like extending interfaces like this.
// interface SearchParams extends CursorPaginationSearchParams, SortingSearchParams {}
interface SearchParams {
  limit: number
  cursor: string
  orderBy: string
  orderDir: "asc" | "desc"
}

const searchParamsDefaults: SearchParams = {
  limit: 10,
  cursor: "",
  orderBy: "name",
  orderDir: "asc",
}

function parseSearchParams(searchParams: URLSearchParams): SearchParams {
  const parsed = typia.http.query<SearchParams>(searchParams)
  return defaults(searchParamsDefaults, parsed)
}

type LoaderData = SerializeFrom<typeof loader>

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url)

  const { cursor, limit, orderBy, orderDir } = parseSearchParams(searchParams)

  const query = `
    with
      remaining := (select Food where .id order by .${orderBy} ${orderDir}),
      results := (select remaining limit ${limit})
    select {
      items := results {*},
      curCursor := ${cursor},
      prevCursor := ${cursor} > 0,
      nextCursor := count(remaining) > ${limit}
    }
  `

  const result = await client.querySingle<{
    items: Food[]
    cursor: string
    prevCursor: string
    nextCursor: string
  }>(query)

  return {
    items: result?.items ?? [],
    pagination: {
      curCursor: result?.cursor ?? null,
      prevCursor: result?.prevCursor ?? null,
      nextCursor: result?.nextCursor ?? null,
    },
  }
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

  const pagination = useCursorPagination<LoaderData>()

  const [sorting, setSorting] = useTanstackSorting(searchParamsDefaults)

  const table = useReactTable({
    data: pagination.items,
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
      <Button
        isDisabled={!pagination.hasPrevious}
        onPress={pagination.onPrevious}
      >
        Prev Page
      </Button>
      <Button isDisabled={!pagination.hasNext} onPress={pagination.onNext}>
        Next Page
      </Button>
    </>
  )
}
