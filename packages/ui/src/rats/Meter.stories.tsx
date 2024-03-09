import type { Meta, StoryObj } from "@storybook/react"

import { Meter } from "./Meter.jsx"

export default { component: Meter } satisfies Meta<typeof Meter>

type Story = StoryObj<typeof Meter>

export const Example: Story = {
  args: {
    label: "Storage space",
    value: 80,
  },
}
