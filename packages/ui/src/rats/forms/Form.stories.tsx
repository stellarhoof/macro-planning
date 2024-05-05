import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../buttons/Button.tsx"
import { DateField } from "../dateAndTime/DateField.tsx"
import { Form } from "./Form.tsx"
import { TextField } from "./TextField.tsx"

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
