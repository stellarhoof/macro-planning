import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { telefunc } from "telefunc/vite"
import vike from "vike/plugin"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react(),
    vike({ redirects: { "/": "/foods" } }),
    telefunc(),
  ],
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
