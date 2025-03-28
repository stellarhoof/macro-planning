import { getRouteApi, useNavigate } from "@tanstack/react-router"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRef } from "react"

import type { Food } from "#dbschema/interfaces.ts"
import { formatGrams, formatNumber } from "#lib/util.ts"
import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { TanstackDataTable } from "#ui-rats/TanstackDataTable.tsx"

import { Actions } from "./Actions.tsx"

const columnHelper = createColumnHelper<Food>()

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: {
      props: {
        header: {
          isRowHeader: true,
        },
      },
    },
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),
  columnHelper.accessor("fats", {
    header: "Fats",
    cell: ({ getValue }) => formatGrams(getValue()),
    meta: { props: { cell: { className: "text-right" } } },
  }),
  columnHelper.accessor("carbs", {
    header: "Carbs",
    cell: ({ getValue }) => formatGrams(getValue()),
    meta: { props: { cell: { className: "text-right" } } },
  }),
  columnHelper.accessor("proteins", {
    header: "Proteins",
    cell: ({ getValue }) => formatGrams(getValue()),
    meta: { props: { cell: { className: "text-right" } } },
  }),
  columnHelper.accessor("calories", {
    header: "Calories",
    cell: ({ getValue }) => formatNumber(getValue()),
    meta: { props: { cell: { className: "text-right" } } },
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
    data: data.items,
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
        selectionMode="multiple"
        table={table}
        sorting={[
          {
            id: search.orderBy,
            desc: search.orderDir === "desc",
          },
        ]}
      />
      <Button
        isDisabled={!data.hasPreviousPage}
        onPress={() =>
          navigate({
            search: (prev) => ({ ...prev, page: prev.page - 1 }),
          })
        }
      >
        Prev Page
      </Button>
      <Button
        isDisabled={!data.hasNextPage}
        onPress={() =>
          navigate({
            search: (prev) => ({ ...prev, page: prev.page + 1 }),
          })
        }
      >
        Next Page
      </Button>
    </>
  )
}
