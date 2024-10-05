import type { Meta, StoryObj } from "@storybook/react"
import { PrinterIcon, SaveIcon } from "lucide-react"
import { TooltipTrigger } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { Tooltip } from "./Tooltip.tsx"

export default { component: Tooltip } satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Example: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <TooltipTrigger>
        <Button variant="secondary" className="px-2">
          <SaveIcon className="h-5 w-5" />
        </Button>
        <Tooltip {...args}>Save</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="secondary" className="px-2">
          <PrinterIcon className="h-5 w-5" />
        </Button>
        <Tooltip {...args}>Print</Tooltip>
      </TooltipTrigger>
    </div>
  ),
}
