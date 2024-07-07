import { vitePlugin as remix } from "@remix-run/dev"
import UnpluginTypia from "@ryoppippi/unplugin-typia/vite"
import hq from "alias-hq"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"

// https://browsersl.ist
const target = browserslistToEsbuild("defaults")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnpluginTypia(),
    remix({
      appDirectory: "src",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  resolve: { alias: hq.get("rollup") },
  optimizeDeps: { esbuildOptions: { target } },
  build: { target },
})
