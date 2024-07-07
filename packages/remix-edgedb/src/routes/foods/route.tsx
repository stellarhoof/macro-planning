import * as edgedb from "edgedb"

import { formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui/TanstackDataTable.tsx"
import type { Food } from "../../../dbschema/interfaces.ts"
import { Actions } from "./Actions.tsx"

import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import {
  type SortingState,
  type Updater,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

const client = edgedb.createClient()

function getOrderSearchParams(searchParams: URLSearchParams) {
  return {
    orderBy: searchParams.get("orderBy") ?? "name",
    orderDir: searchParams.get("orderDir") ?? "asc",
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const { orderBy, orderDir } = getOrderSearchParams(url.searchParams)
  return await client.query<Food>(
    `select Food {*} order by .${orderBy} ${orderDir}`,
  )
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

function searchParamsToSortingState(
  searchParams: URLSearchParams,
): SortingState {
  const { orderBy, orderDir } = getOrderSearchParams(searchParams)
  return [{ id: orderBy, desc: orderDir === "desc" }]
}

function sortingStateToSearchParams(sortingState: SortingState) {
  const sorting = sortingState[0]
  if (sorting) {
    return {
      orderBy: sorting.id,
      orderDir: sorting.desc ? "desc" : "asc",
    }
  }
}

export default function Foods() {
  const data = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  function onSortingChange(updater: Updater<SortingState>) {
    if (typeof updater !== "function") {
      const params = sortingStateToSearchParams(updater)
      if (params) {
        setSearchParams(params)
      }
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TanstackDataTable
      aria-label="Foods"
      selectionMode="single"
      table={table}
      sorting={searchParamsToSortingState(searchParams)}
    />
  )
}
