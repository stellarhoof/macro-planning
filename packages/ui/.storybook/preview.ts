import "./index.css"

import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"

export default {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes.dark
        : themes.light,
    },
  },
} satisfies Preview
