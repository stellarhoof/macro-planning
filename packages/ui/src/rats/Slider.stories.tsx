import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "./Slider.jsx"

export default { component: Slider } satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Example: Story = {
  args: {
    label: "Range",
    defaultValue: [30, 60],
    thumbLabels: ["start", "end"],
  },
}
