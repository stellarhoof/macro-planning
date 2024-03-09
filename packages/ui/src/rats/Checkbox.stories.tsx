import type { Meta, StoryObj } from "@storybook/react"

import { Checkbox } from "./Checkbox.jsx"

export default { component: Checkbox } satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Example: Story = {
  args: {
    children: "Checkbox",
  },
}
