import type { Food } from "@prisma/client"
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Heading, type Key, MenuTrigger } from "react-aria-components"
import { useAsyncList } from "react-stately"

import { formatGrams } from "#lib/util.ts"
import { DataTable, type TCellContext, type TColumns } from "#ui/DataTable.tsx"
import { Button } from "#ui/rats/buttons/Button.tsx"
import { Menu, MenuItem } from "#ui/rats/collections/Menu.tsx"
import { TextField } from "#ui/rats/forms/TextField.tsx"
import { AlertDialog } from "#ui/rats/overlays/AlertDialog.tsx"
import { Dialog } from "#ui/rats/overlays/Dialog.tsx"
import { Modal } from "#ui/rats/overlays/Modal.tsx"

import { onLoad } from "./Page.telefunc.ts"

type TRow = Food & { actions?: undefined }

function EditFood(_props: TCellContext<undefined, TRow>) {
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

function RemoveFood(_props: TCellContext<undefined, TRow>) {
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

function Actions(props: TCellContext<undefined, TRow>) {
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

const columns: TColumns<TRow> = {
  name: {
    props: { column: { isRowHeader: true, allowsSorting: true } },
  },
  brand: {
    props: { column: { allowsSorting: true } },
  },
  fats: {
    cell: ({ value }) => formatGrams(value),
    props: { column: { allowsSorting: true } },
  },
  carbs: {
    cell: ({ value }) => formatGrams(value),
    props: { column: { allowsSorting: true } },
  },
  proteins: {
    cell: ({ value }) => formatGrams(value),
    props: { column: { allowsSorting: true } },
  },
  actions: {
    label: false,
    cell: (ctx) => <Actions {...ctx} />,
  },
}

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
