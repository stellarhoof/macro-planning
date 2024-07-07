import type { Food } from "@prisma/client"
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Heading, type Key, MenuTrigger } from "react-aria-components"
import { useAsyncList } from "react-stately"

import { formatGrams, formatNumber } from "#lib/util.ts"
import { TanstackDataTable } from "#ui/TanstackDataTable.tsx"
import { Button } from "#ui/rats/buttons/Button.tsx"
import { Menu, MenuItem } from "#ui/rats/collections/Menu.tsx"
import { TextField } from "#ui/rats/forms/TextField.tsx"
import { AlertDialog } from "#ui/rats/overlays/AlertDialog.tsx"
import { Dialog } from "#ui/rats/overlays/Dialog.tsx"
import { Modal } from "#ui/rats/overlays/Modal.tsx"

import {
  type CellContext,
  type SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { onLoad } from "./Page.telefunc.ts"

const columnHelper = createColumnHelper<Food>()

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

export function Page() {
  // TODO: Figure out how to use tanstack sorting with useAsyncList
  const list = useAsyncList<Food>({
    initialSortDescriptor: {
      column: "name",
      direction: "ascending",
    },
    getKey(food) {
      return food.id
    },
    async load({ sortDescriptor }) {
      const items = await onLoad({ sortDescriptor })
      return { items }
    },
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data: list.items,
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
