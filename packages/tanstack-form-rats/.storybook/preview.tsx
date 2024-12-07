import { type Preview } from "@storybook/react"
import * as React from "react"

import "./index.css"

export default {
  decorators: [
    (Story) => (
      <React.StrictMode>
        <Story />
      </React.StrictMode>
    ),
  ],
} satisfies Preview
