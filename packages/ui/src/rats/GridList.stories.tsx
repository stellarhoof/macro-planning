import type { Meta, StoryObj } from "@storybook/react"

import { GridList, GridListItem } from "./GridList.tsx"

export default { component: GridList } satisfies Meta<typeof GridList>

type Story = StoryObj<typeof GridList>

export const Example: Story = {
  args: {
    selectionMode: "multiple",
  },
  render: (args) => (
    <GridList aria-label="Ice cream flavors" {...args}>
      <GridListItem id="chocolate">Chocolate</GridListItem>
      <GridListItem id="mint">Mint</GridListItem>
      <GridListItem id="strawberry">Strawberry</GridListItem>
      <GridListItem id="vanilla">Vanilla</GridListItem>
    </GridList>
  ),
}

export const DisabledItems = {
  args: {
    ...Example.args,
    disabledKeys: ["mint"],
  },
}
