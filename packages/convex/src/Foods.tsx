import { useQuery } from "convex/react"
import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Heading, type Key, MenuTrigger } from "react-aria-components"
import type { SortDescriptor } from "react-stately"

import { api } from "#convex/_generated/api.js"
import type { Doc } from "#convex/_generated/dataModel.js"
import { formatGrams } from "#lib/util.js"
import { DataTable, type TCellContext, type TColumns } from "#ui/DataTable.jsx"
import { AlertDialog } from "#ui/rats/AlertDialog.jsx"
import { Button } from "#ui/rats/Button.jsx"
import { Dialog } from "#ui/rats/Dialog.jsx"
import { Menu, MenuItem } from "#ui/rats/Menu.jsx"
import { Modal } from "#ui/rats/Modal.jsx"
import { TextField } from "#ui/rats/TextField.jsx"

type TRow = Doc<"food"> & { actions?: undefined }

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
    label: "Name",
    props: { column: { isRowHeader: true, allowsSorting: true } },
  },
  brand: {
    label: "Brand",
    props: { column: { allowsSorting: true } },
  },
  fats: {
    label: "Fats",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  carbs: {
    label: "Carbs",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  proteins: {
    label: "Proteins",
    cell: (ctx) => formatGrams(ctx.value),
    props: { column: { allowsSorting: true } },
  },
  calories: {
    label: "Calories",
    cell: (ctx) => ctx.value,
    props: { column: { allowsSorting: true } },
  },
  actions: {
    cell: (ctx) => <Actions {...ctx} />,
  },
}

export const Foods = ({ user }: { user: Doc<"user"> }) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  })
  const rows = useQuery(api.functions.getFoods, { userId: user._id }) ?? []
  return (
    <DataTable
      aria-label="Foods"
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      columns={columns}
      rows={rows.map((row) => ({ ...row, id: row._id }))}
    />
  )
}
