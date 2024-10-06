import type { Meta, StoryObj } from "@storybook/react"

import { ColorSwatch as Component } from "./ColorSwatch.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    color: "#f00a",
  },
}
