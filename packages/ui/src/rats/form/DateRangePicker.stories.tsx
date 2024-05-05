import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "../Button.tsx"
import { DateRangePicker } from "./DateRangePicker.tsx"

export default { component: DateRangePicker } satisfies Meta<
  typeof DateRangePicker
>

type Story = StoryObj<typeof DateRangePicker>

export const Example: Story = {
  args: {
    label: "Trip dates",
  },
}

export const Validation: Story = {
  args: {
    label: "Trip dates",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <DateRangePicker {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
