import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.tsx"
import { Radio, RadioGroup } from "./RadioGroup.tsx"

export default { component: RadioGroup } satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof RadioGroup>

export const Example: Story = {
  args: {
    label: "Favorite sport",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
      <Radio value="basketball">Basketball</Radio>
    </RadioGroup>
  ),
}

export const Validation: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <RadioGroup {...args}>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
