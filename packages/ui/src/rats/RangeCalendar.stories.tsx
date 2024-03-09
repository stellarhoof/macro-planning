import type { Meta, StoryObj } from "@storybook/react"

import { RangeCalendar } from "./RangeCalendar.jsx"

export default { component: RangeCalendar } satisfies Meta<typeof RangeCalendar>

type Story = StoryObj<typeof RangeCalendar>

export const Example: Story = {
  args: {
    // @ts-expect-error I'll fix this later
    "aria-label": "Trip dates",
  },
}
