import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackStart({ router: { routeFilePrefix: "~", addExtensions: true } }),
    react(),
    tailwindcss(),
  ],
  resolve: { tsconfigPaths: true },
})
