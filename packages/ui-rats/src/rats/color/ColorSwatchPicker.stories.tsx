import type { Meta, StoryObj } from "@storybook/react"

import {
  ColorSwatchPickerItem,
  ColorSwatchPicker as Component,
} from "./ColorSwatchPicker.tsx"

export default { component: Component } satisfies Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render(props) {
    return (
      <Component {...props}>
        <ColorSwatchPickerItem color="#A00" />
        <ColorSwatchPickerItem color="#f80" />
        <ColorSwatchPickerItem color="#080" />
        <ColorSwatchPickerItem color="#08f" />
        <ColorSwatchPickerItem color="#088" />
        <ColorSwatchPickerItem color="#008" />
      </Component>
    )
  },
}
