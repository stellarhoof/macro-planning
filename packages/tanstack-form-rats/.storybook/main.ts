import { dirname, join } from "node:path"

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")))
}

export default {
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  stories: ["../src/**/*.stories.@(ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs")
  ]
};
