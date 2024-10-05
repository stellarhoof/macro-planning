import type { Meta, StoryObj } from "@storybook/react"

import { Link } from "./Link.tsx"

export default { component: Link } satisfies Meta<typeof Link>

type Story = StoryObj<typeof Link>

export const Example: Story = {
  args: {
    href: "https://www.imdb.com/title/tt6348138/",
    target: "_blank",
    children: "The missing link",
  },
}
