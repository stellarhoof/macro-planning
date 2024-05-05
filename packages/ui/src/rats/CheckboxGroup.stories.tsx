import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.tsx"
import { Checkbox, CheckboxGroup } from "./Checkbox.tsx"

export default { component: CheckboxGroup } satisfies Meta<typeof CheckboxGroup>

type Story = StoryObj<typeof CheckboxGroup>

export const Example: Story = {
  args: {
    label: "Cities",
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="sf">San Francisco</Checkbox>
      <Checkbox value="ny">New York</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
  ),
}

export const Validation: Story = {
  args: {
    label: "Cities",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <CheckboxGroup {...args}>
        <Checkbox value="sf">San Francisco</Checkbox>
        <Checkbox value="ny">New York</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
