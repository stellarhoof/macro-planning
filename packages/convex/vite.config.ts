import react from "@vitejs/plugin-react"
import hq from "alias-hq"
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { defineConfig } from "vite"

// https://browsersl.ist
const target = browserslistToEsbuild('defaults')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: hq.get("rollup") },
  optimizeDeps: { esbuildOptions: { target } },
  build: { target }
})
