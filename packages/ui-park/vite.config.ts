import hq from "alias-hq"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: hq.get("rollup") },
})
