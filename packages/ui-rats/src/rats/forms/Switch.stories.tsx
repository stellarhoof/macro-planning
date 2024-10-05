import type { Meta, StoryObj } from "@storybook/react"

import { Switch } from "./Switch.tsx"

export default { component: Switch } satisfies Meta<typeof Switch>

type Story = StoryObj<typeof Switch>

export const Example: Story = {
  args: {
    children: "Wi-Fi",
  },
}
