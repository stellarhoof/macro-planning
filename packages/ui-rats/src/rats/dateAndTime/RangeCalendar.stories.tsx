import type { Meta, StoryObj } from "@storybook/react"

import { RangeCalendar } from "./RangeCalendar.tsx"

export default { component: RangeCalendar } satisfies Meta<typeof RangeCalendar>

type Story = StoryObj<typeof RangeCalendar>

export const Example: Story = {
  args: {
    "aria-label": "Trip dates",
  },
}
