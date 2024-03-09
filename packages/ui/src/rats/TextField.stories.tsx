import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.jsx"
import { TextField } from "./TextField.jsx"

export default { component: TextField } satisfies Meta<typeof TextField>

type Story = StoryObj<typeof TextField>

export const Example: Story = {
  args: {
    label: "Name",
  },
}

export const Validation: Story = {
  args: {
    label: "Name",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <TextField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
