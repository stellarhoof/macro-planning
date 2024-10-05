import type { Meta, StoryObj } from "@storybook/react"
import { HelpCircle } from "lucide-react"
import { DialogTrigger, Heading } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { Dialog } from "./Dialog.tsx"
import { Popover } from "./Popover.tsx"

export default { component: Popover } satisfies Meta<typeof Popover>

type Story = StoryObj<typeof Popover>

export const Example: Story = {
  args: {
    showArrow: true,
  },
  render: (args) => (
    <DialogTrigger>
      <Button variant="icon" aria-label="Help">
        <HelpCircle className="h-4 w-4" />
      </Button>
      <Popover {...args} className="max-w-[250px]">
        <Dialog>
          <Heading slot="title" className="mb-2 text-lg font-semibold">
            Help
          </Heading>
          <p className="text-sm">
            For help accessing your account, please contact support.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
}
