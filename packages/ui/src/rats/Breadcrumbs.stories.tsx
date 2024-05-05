import type { Meta, StoryObj } from "@storybook/react"

import { Breadcrumb, Breadcrumbs } from "./Breadcrumbs.tsx"

export default { component: Breadcrumbs } satisfies Meta<typeof Breadcrumbs>

type Story = StoryObj<typeof Breadcrumbs>

export const Example: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/react-aria">React Aria</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  ),
}
