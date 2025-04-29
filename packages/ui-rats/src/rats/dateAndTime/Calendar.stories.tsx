import type { Meta, StoryObj } from "@storybook/react-vite"

import { Calendar } from "./Calendar.tsx"

export default { component: Calendar } satisfies Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

export const Example: Story = {
  args: {
    "aria-label": "Event date",
  },
}
