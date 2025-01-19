import { vitePlugin as remix } from "@remix-run/dev"
import unpluginTypia from "@ryoppippi/unplugin-typia/vite"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    unpluginTypia(),
    remix({
      appDirectory: "src",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
