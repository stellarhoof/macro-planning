import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./Button.jsx"

export default { component: Button } satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
}
