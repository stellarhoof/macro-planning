import type { Meta, StoryObj } from "@storybook/react"

import { ToggleButton } from "./ToggleButton.tsx"

export default { component: ToggleButton } satisfies Meta<typeof ToggleButton>

type Story = StoryObj<typeof ToggleButton>

export const Example: Story = {
  args: {
    children: "Pin",
  },
}
