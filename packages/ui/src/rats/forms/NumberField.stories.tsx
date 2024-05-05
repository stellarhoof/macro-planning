import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { NumberField } from "./NumberField.tsx"

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
