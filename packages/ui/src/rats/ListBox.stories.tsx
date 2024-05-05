import type { Meta, StoryObj } from "@storybook/react"

import { ListBox, ListBoxItem } from "./ListBox.tsx"

export default { component: ListBox } satisfies Meta<typeof ListBox>

type Story = StoryObj<typeof ListBox>

export const Example: Story = {
  args: {
    selectionMode: "multiple",
  },
  render: (args) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
      <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
    </ListBox>
  ),
}

export const DisabledItems: Story = {
  args: {
    ...Example.args,
    disabledKeys: ["mint"],
  },
}
