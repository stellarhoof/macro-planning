import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import hq from "alias-hq"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"

import { routes } from "./src/routes.ts"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src",
      generatedRouteTree: "./src/routes.gen.ts",
      addExtensions: true,
      virtualRouteConfig: routes,
    }),
    react(),
  ],
  resolve: { alias: hq.get("rollup") },
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
