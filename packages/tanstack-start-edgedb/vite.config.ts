import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { routes } from "./src/routes.ts"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#options
    TanStackRouterVite({
      routesDirectory: "./src",
      generatedRouteTree: "./src/routes.gen.ts",
      addExtensions: true,
      virtualRouteConfig: routes,
    }),
    react(),
  ],
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
