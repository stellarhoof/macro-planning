import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.tsx"
import { DatePicker } from "./DatePicker.tsx"

export default { component: DatePicker } satisfies Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

export const Example: Story = {
  args: {
    label: "Event date",
  },
}

export const Validation: Story = {
  args: {
    label: "Event date",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <DatePicker {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
