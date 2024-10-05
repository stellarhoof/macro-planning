import { defineConfig } from "@pandacss/dev"
import { preset } from "./src/panda-preset/index.ts"

// https://panda-css.com/docs/references/config
// https://panda-css.com/docs/guides/minimal-setup
export default defineConfig({
  clean: true,
  outExtension: "js",
  preflight: true,
  presets: [preset],
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "./src/panda-styles",
})
