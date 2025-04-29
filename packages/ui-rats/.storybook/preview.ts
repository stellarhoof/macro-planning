import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"

import "./index.css"

export default {
  tags: ["autodocs"],
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
