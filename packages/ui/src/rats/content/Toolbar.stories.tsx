import type { Meta, StoryObj } from "@storybook/react"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Group } from "react-aria-components"

import { Separator } from "../Separator.tsx"
import { Button } from "../buttons/Button.tsx"
import { ToggleButton } from "../buttons/ToggleButton.tsx"
import { Checkbox } from "../forms/Checkbox.tsx"
import { Toolbar } from "./Toolbar.tsx"

export default { component: Toolbar } satisfies Meta<typeof Toolbar>

type Story = StoryObj<typeof Toolbar>

export const Example: Story = {
  render: (args) => (
    <Toolbar aria-label="Text formatting" {...args}>
      <Group aria-label="Style" className="contents">
        <ToggleButton aria-label="Bold" className="p-2.5">
          <BoldIcon className="h-4 w-4" />
        </ToggleButton>
        <ToggleButton aria-label="Italic" className="p-2.5">
          <ItalicIcon className="h-4 w-4" />
        </ToggleButton>
        <ToggleButton aria-label="Underline" className="p-2.5">
          <UnderlineIcon className="h-4 w-4" />
        </ToggleButton>
      </Group>
      <Separator
        orientation={
          args.orientation === "vertical" ? "horizontal" : "vertical"
        }
      />
      <Group aria-label="Clipboard" className="contents">
        <Button variant="secondary">Copy</Button>
        <Button variant="secondary">Paste</Button>
        <Button variant="secondary">Cut</Button>
      </Group>
      <Separator
        orientation={
          args.orientation === "vertical" ? "horizontal" : "vertical"
        }
      />
      <Checkbox>Night Mode</Checkbox>
    </Toolbar>
  ),
}
