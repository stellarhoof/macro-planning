import * as edgedb from "edgedb"
import { useState } from "react"

import { formatGrams, formatNumber } from "#lib/util.ts"
import { DataTable } from "#ui/DataTable.tsx"
import type { Food } from "../../../dbschema/interfaces.ts"
import { Actions } from "./Actions.tsx"

import { useLoaderData } from "@remix-run/react"
import {
  type SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

const client = edgedb.createClient()

export async function loader() {
  return await client.query<Food>("select Food {*}")
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

export default function Foods() {
  const data = useLoaderData<typeof loader>()
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <DataTable
      aria-label="Foods"
      selectionMode="single"
      table={table}
      sorting={sorting}
    />
  )
}
