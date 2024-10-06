import type { Meta, StoryObj } from "@storybook/react"

import { ColorArea as Component } from "./ColorArea.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
