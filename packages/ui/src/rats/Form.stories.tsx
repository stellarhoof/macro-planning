import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./Button.jsx"
import { DateField } from "./DateField.jsx"
import { Form } from "./Form.jsx"
import { TextField } from "./TextField.jsx"

export default { component: Form } satisfies Meta<typeof Form>

type Story = StoryObj<typeof Form>

export const Example: Story = {
  render: (args) => (
    <Form {...args}>
      <TextField label="Email" name="email" type="email" isRequired />
      <DateField label="Birth date" isRequired />
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  ),
}
