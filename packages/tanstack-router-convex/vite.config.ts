import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#options
    TanStackRouterVite({
      routeFilePrefix: "~",
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routes.gen.ts",
      addExtensions: true,
    }),
    react(),
  ],
  // resolve: { alias: hq.get("rollup") },
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
