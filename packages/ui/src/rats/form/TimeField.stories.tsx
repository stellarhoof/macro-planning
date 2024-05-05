import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "../Button.tsx"
import { TimeField } from "./TimeField.tsx"

export default { component: TimeField } satisfies Meta<typeof TimeField>

type Story = StoryObj<typeof TimeField>

export const Example: Story = {
  args: {
    label: "Event time",
  },
}

export const Validation: Story = {
  args: {
    label: "Event time",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <TimeField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
