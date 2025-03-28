import type { Preview } from "@storybook/react"
import * as React from "react"

export default {
  decorators: [
    (Story) => (
      <React.StrictMode>
        <Story />
      </React.StrictMode>
    ),
  ],
} satisfies Preview
