import type { Meta, StoryObj } from "@storybook/react"
import { DialogTrigger } from "react-aria-components"

import { AlertDialog } from "./AlertDialog.tsx"
import { Button } from "./Button.tsx"
import { Modal } from "./Modal.tsx"

export default { component: AlertDialog } satisfies Meta<typeof AlertDialog>

type Story = StoryObj<typeof AlertDialog>

export const Example: Story = {
  args: {
    title: "Delete folder",
    variant: "destructive",
    actionLabel: "Delete",
    children:
      'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
  },
  render: (args) => (
    <DialogTrigger>
      <Button variant="secondary">Delete…</Button>
      <Modal>
        <AlertDialog {...args} />
      </Modal>
    </DialogTrigger>
  ),
}
