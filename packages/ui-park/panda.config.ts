import { defineConfig } from "@pandacss/dev"
// import { preset } from "./panda-preset/index.ts"

// https://panda-css.com/docs/references/config
// https://panda-css.com/docs/guides/minimal-setup
export default defineConfig({
  clean: true,
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  include: ["./src/ui/**/*.{ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outExtension: "js",
  outdir: "./src/panda-gen",
})
