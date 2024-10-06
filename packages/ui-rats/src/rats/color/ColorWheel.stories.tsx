import type { Meta, StoryObj } from "@storybook/react"

import { ColorWheel as Component } from "./ColorWheel.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
