import type { Meta, StoryObj } from "@storybook/react"

import { Calendar } from "./Calendar.tsx"

export default { component: Calendar } satisfies Meta<typeof Calendar>

type Story = StoryObj<typeof Calendar>

export const Example: Story = {
  args: {
    // @ts-expect-error I'll fix this later
    "aria-label": "Event date",
  },
}
