import type { Meta, StoryObj } from "@storybook/react"

import { ProgressBar } from "./ProgressBar.tsx"

export default { component: ProgressBar } satisfies Meta<typeof ProgressBar>

type Story = StoryObj<typeof ProgressBar>

export const Example: Story = {
  args: {
    label: "Loading…",
    value: 80,
  },
}
