import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import {
  Heading,
  type Key,
  MenuTrigger,
  type SortDescriptor,
} from "react-aria-components"

import { formatGrams } from "#lib/util.ts"
import { DataTable, type TCellContext, type TColumns } from "#ui/DataTable.tsx"
import { AlertDialog } from "#ui/rats/AlertDialog.tsx"
import { Button } from "#ui/rats/Button.tsx"
import { Dialog } from "#ui/rats/Dialog.tsx"
import { Menu, MenuItem } from "#ui/rats/Menu.tsx"
import { Modal } from "#ui/rats/Modal.tsx"
import { TextField } from "#ui/rats/TextField.tsx"

import type { AppStore, TFood } from "./store.ts"

type TRow = TFood & { actions?: undefined }

const EditFood = (_props: TCellContext<undefined, TRow>) => {
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

const RemoveFood = (_props: TCellContext<undefined, TRow>) => {
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

const Actions = (props: TCellContext<undefined, TRow>) => {
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

interface Props {
  store: AppStore
}

export const Foods = observer(({ store }: Props) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  })
  return (
    <DataTable
      aria-label="Foods"
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      columns={columns}
      rows={[...store.foods]}
    />
  )
})
