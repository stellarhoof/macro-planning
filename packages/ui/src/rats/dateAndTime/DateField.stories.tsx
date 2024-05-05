import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { DateField } from "./DateField.tsx"

export default { component: DateField } satisfies Meta<typeof DateField>

type Story = StoryObj<typeof DateField>

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
      <DateField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
