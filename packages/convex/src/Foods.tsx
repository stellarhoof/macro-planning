import { useQuery } from "convex/react"
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Heading, type Key, MenuTrigger } from "react-aria-components"

import { useReactTable } from "@tanstack/react-table"
import {
  type CellContext,
  type ColumnHelper,
  type SortingState,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/table-core"
import { api } from "#convex/_generated/api.js"
import type { Doc } from "#convex/_generated/dataModel.ts"
import { type ExportedTable, tables } from "#convex/tables.ts"
import { def, formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui/TanstackDataTable.tsx"
import { Button } from "#ui/rats/buttons/Button.tsx"
import { Menu, MenuItem } from "#ui/rats/collections/Menu.tsx"
import { TextField } from "#ui/rats/forms/TextField.tsx"
import { AlertDialog } from "#ui/rats/overlays/AlertDialog.tsx"
import { Dialog } from "#ui/rats/overlays/Dialog.tsx"
import { Modal } from "#ui/rats/overlays/Modal.tsx"

function createColumnHelperPlus<TData extends Record<PropertyKey, unknown>>(
  table: ExportedTable,
): ColumnHelper<TData> {
  const sortableFields = Object.values(table.indexes).map(
    (index) => index.fields[0],
  )
  const helper = createColumnHelper<TData>()
  return {
    accessor(accessor, column) {
      return helper.accessor(
        accessor,
        typeof accessor === "string"
          ? def(column, "enableSorting", sortableFields.includes(accessor))
          : column,
      )
    },
    display: helper.display,
    group: helper.group,
  }
}

type Food = Doc<"food">

const columnHelper = createColumnHelperPlus<Food>(tables.food)

const EditFood = (_props: CellContext<Food, unknown>) => {
  return (
    <Dialog>
      {({ close }) => (
        <form>
          <Heading slot="title">Sign up</Heading>
          <TextField autoFocus label="First Name" />
          <TextField label="Last Name" />
          <Button onPress={close}>Submit</Button>
        </form>
      )}
    </Dialog>
  )
}

const RemoveFood = (_props: CellContext<Food, unknown>) => {
  return (
    <AlertDialog
      title="Delete Folder"
      actionLabel="Delete"
      variant="destructive"
    >
      Are you sure you want to delete Documents? All contents will be
      permanently destroyed.
    </AlertDialog>
  )
}

const Actions = (props: CellContext<Food, unknown>) => {
  const [dialog, setDialog] = useState<Key>("")
  const Component = { EditFood, RemoveFood }[dialog]
  return (
    <>
      <MenuTrigger>
        <Button variant="icon" aria-label="Actions">
          <MoreHorizontal />
        </Button>
        <Menu onAction={setDialog}>
          <MenuItem id="EditFood">
            <FilePenLine className="h-4 w-4" />
            <span>Edit Food...</span>
          </MenuItem>
          <MenuItem id="RemoveFood">
            <Trash2 className="h-4 w-4" />
            <span>Remove Food...</span>
          </MenuItem>
        </Menu>
      </MenuTrigger>
      {Component && (
        <Modal isOpen onOpenChange={() => setDialog("")}>
          <Component {...props} />
        </Modal>
      )}
    </>
  )
}

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

export const Foods = ({ user }: { user: Doc<"user"> }) => {
  const data = useQuery(api.functions.getFoods, { userId: user._id }) ?? []
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <TanstackDataTable
      aria-label="Foods"
      selectionMode="single"
      table={table}
      sorting={sorting}
    />
  )
}
