import { dirname, join } from "path"

import type { StorybookConfig } from "@storybook/react-vite"

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}

export default {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-docs")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
} satisfies StorybookConfig
