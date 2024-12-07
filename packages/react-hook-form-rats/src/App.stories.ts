import type { Meta, StoryObj } from "@storybook/react"

import App from "./App.tsx"

export default {
  component: App,
} satisfies Meta<typeof App>

type Story = StoryObj<typeof App>

export const Default: Story = {}
