import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.jsx"
import { NumberField } from "./NumberField.jsx"

export default { component: NumberField } satisfies Meta<typeof NumberField>

type Story = StoryObj<typeof NumberField>

export const Example: Story = {
  args: {
    label: "Cookies",
  },
}

export const Validation: Story = {
  args: {
    label: "Cookies",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <NumberField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
