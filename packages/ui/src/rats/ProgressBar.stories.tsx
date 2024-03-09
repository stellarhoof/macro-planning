import type { Meta, StoryObj } from "@storybook/react"

import { ProgressBar } from "./ProgressBar.jsx"

export default { component: ProgressBar } satisfies Meta<typeof ProgressBar>

type Story = StoryObj<typeof ProgressBar>

export const Example: Story = {
  args: {
    label: "Loading…",
    value: 80,
  },
}
