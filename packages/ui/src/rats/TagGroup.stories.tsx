import type { Meta, StoryObj } from "@storybook/react"

import { Tag, TagGroup } from "./TagGroup.jsx"

export default { component: TagGroup } satisfies Meta<typeof TagGroup>

type Story = StoryObj<typeof TagGroup>

export const Example: Story = {
  args: {
    label: "Ice cream flavor",
    selectionMode: "single",
  },
  render: (args) => (
    <TagGroup {...args}>
      <Tag>Chocolate</Tag>
      <Tag>Mint</Tag>
      <Tag>Strawberry</Tag>
      <Tag>Vanilla</Tag>
    </TagGroup>
  ),
}
