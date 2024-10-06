import type { Meta, StoryObj } from "@storybook/react"

import { ColorSlider as Component } from "./ColorSlider.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    label: "Fill Color",
    channel: "hue",
    colorSpace: "hsl",
    defaultValue: "#f00",
  },
}
