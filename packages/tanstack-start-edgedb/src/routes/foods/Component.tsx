import { getRouteApi, useNavigate } from "@tanstack/react-router"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRef } from "react"

import type { Food } from "#dbschema/interfaces.ts"
import { formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui-rats/TanstackDataTable.tsx"
import { Button } from "#ui-rats/rats/buttons/Button.tsx"

import { Actions } from "./Actions.tsx"

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

const route = getRouteApi("/foods")

// See https://news.ycombinator.com/item?id=30376689
export function Component() {
  const ref = useRef<HTMLTableElement>(null)
  const data = route.useLoaderData()
  const search = route.useSearch()
  const navigate = useNavigate({ from: route.id })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (updater) => {
      if (Array.isArray(updater)) {
        const sorting = updater[0]
        if (sorting) {
          navigate({
            search: (prev) => ({
              ...prev,
              orderBy: sorting.id,
              orderDir: sorting.desc ? "desc" : "asc",
            }),
          })
        }
      }
    },
  })

  return (
    <>
      <TanstackDataTable
        ref={ref}
        aria-label="Foods"
        selectionMode="single"
        table={table}
        sorting={[
          {
            id: search.orderBy,
            desc: search.orderDir === "desc",
          },
        ]}
      />
      <Button
        isDisabled={data.pagination.prevCursor === null}
        onPress={() =>
          navigate({
            search: (prev) => ({
              ...prev,
              cursor: data.pagination.prevCursor ?? "",
            }),
          })
        }
      >
        Prev Page
      </Button>
      <Button
        isDisabled={data.pagination.nextCursor === null}
        onPress={() =>
          navigate({
            search: (prev) => ({
              ...prev,
              cursor: data.pagination.nextCursor ?? "",
            }),
          })
        }
      >
        Next Page
      </Button>
    </>
  )
}
