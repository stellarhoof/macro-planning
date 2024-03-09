import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.jsx"
import { SearchField } from "./SearchField.jsx"

export default { component: SearchField } satisfies Meta<typeof SearchField>

type Story = StoryObj<typeof SearchField>

export const Example: Story = {
  args: {
    label: "Search",
  },
}

export const Validation: Story = {
  args: {
    label: "Search",
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <SearchField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
