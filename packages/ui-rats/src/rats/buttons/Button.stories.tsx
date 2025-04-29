import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./Button.tsx"

export default { component: Button } satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
  play(x) {
    console.log(x)
    // expect(readFileSync("./Primary.png")).toMatchImageSnapshot()
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
}
