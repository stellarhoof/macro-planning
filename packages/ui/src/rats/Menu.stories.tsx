import type { Meta, StoryObj } from "@storybook/react"
import { MoreHorizontal } from "lucide-react"
import { MenuTrigger } from "react-aria-components"

import { Button } from "./Button.tsx"
import { Menu, MenuItem, MenuSection, MenuSeparator } from "./Menu.tsx"

export default { component: Menu } satisfies Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

export const Example: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button variant="secondary" className="px-2">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
      <Menu {...args}>
        <MenuItem id="new">New…</MenuItem>
        <MenuItem id="open">Open…</MenuItem>
        <MenuSeparator />
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="saveAs">Save as…</MenuItem>
        <MenuSeparator />
        <MenuItem id="print">Print…</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const DisabledItems: Story = {
  args: {
    disabledKeys: ["save"],
  },
  render: Example.render,
}

export const Sections: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button variant="secondary" className="px-2">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
      <Menu {...args}>
        <MenuSection title="Your Content">
          <MenuItem id="repos">Repositories</MenuItem>
          <MenuItem id="projects">Projects</MenuItem>
          <MenuItem id="organizations">Organizations</MenuItem>
          <MenuItem id="stars">Stars</MenuItem>
          <MenuItem id="sponsors">Sponsors</MenuItem>
        </MenuSection>
        <MenuSection title="Your Account">
          <MenuItem id="profile">Profile</MenuItem>
          <MenuItem id="status">Set status</MenuItem>
          <MenuItem id="sign-out">Sign out</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
}
