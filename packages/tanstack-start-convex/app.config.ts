import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "@tanstack/start/config"
import browserslistToEsbuild from "browserslist-to-esbuild"
import tsconfigPaths from "vite-tsconfig-paths"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  vite: {
    plugins: [
      // @ts-expect-error: Some vinxi types error.
      tsconfigPaths(),
      // @ts-expect-error: Some vinxi types error.
      tailwindcss(),
    ],
    optimizeDeps: { esbuildOptions: { target } },
    build: { target },
  },
  tsr: {
    appDirectory: "src",
    routeFilePrefix: "~",
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routes.gen.ts",
    addExtensions: true,
  },
})
