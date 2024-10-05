import { dirname, join } from "node:path"
import type { StorybookConfig } from "@storybook/react-vite"

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")))
}

export default {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
} satisfies StorybookConfig
