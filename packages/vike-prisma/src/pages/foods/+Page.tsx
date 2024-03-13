import type { Food } from "@prisma/client"
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Heading, type Key, MenuTrigger } from "react-aria-components"
import { useAsyncList } from "react-stately"

import { formatGrams } from "#lib/util.js"
import { type CellContext, type Column, DataTable } from "#ui/DataTable.jsx"
import { AlertDialog } from "#ui/rats/AlertDialog.jsx"
import { Button } from "#ui/rats/Button.jsx"
import { Dialog } from "#ui/rats/Dialog.jsx"
import { Menu, MenuItem } from "#ui/rats/Menu.jsx"
import { Modal } from "#ui/rats/Modal.jsx"
import { TextField } from "#ui/rats/TextField.jsx"

import { onLoad } from "./Page.telefunc.js"

function EditFood(_props: CellContext<Food>) {
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

function RemoveFood(_props: CellContext<Food>) {
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

function Actions(props: CellContext<Food>) {
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

const columns: Column<Food>[] = [
  {
    id: "brand",
    label: "Brand",
    props: { column: { allowsSorting: true } },
  },
  {
    id: "name",
    label: "Name",
    props: { column: { isRowHeader: true, allowsSorting: true } },
  },
  {
    id: "carbs",
    label: "Carbs",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  {
    id: "proteins",
    label: "Proteins",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  {
    id: "fats",
    label: "Fats",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  {
    id: "actions",
    cell: (ctx) => <Actions {...ctx} />,
  },
]

// TODO:
// - Pagination
// - Computed fields
// - Filtering
// - CRUD
export function Page() {
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

  return (
    <DataTable
      aria-label="Foods"
      selectionMode="single"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      columns={columns}
      rows={list.items}
    />
  )
}
