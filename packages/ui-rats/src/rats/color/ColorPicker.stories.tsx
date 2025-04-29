import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorPicker as Component } from "./ColorPicker.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    label: "Color",
    defaultValue: "#ff0",
  },
}
