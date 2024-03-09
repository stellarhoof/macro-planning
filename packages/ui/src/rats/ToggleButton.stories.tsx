import type { Meta, StoryObj } from "@storybook/react"

import { ToggleButton } from "./ToggleButton.jsx"

export default { component: ToggleButton } satisfies Meta<typeof ToggleButton>

type Story = StoryObj<typeof ToggleButton>

export const Example: Story = {
  args: {
    children: "Pin",
  },
}
