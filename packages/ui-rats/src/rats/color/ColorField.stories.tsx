import type { Meta, StoryObj } from "@storybook/react-vite"

import { ColorField as Component } from "./ColorField.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    label: "Color",
    defaultValue: "#ff0",
  },
}
