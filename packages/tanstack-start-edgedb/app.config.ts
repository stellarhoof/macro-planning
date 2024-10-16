import { defineConfig } from "@tanstack/start/config"
import hq from "alias-hq"

import { routes } from "./src/routes.ts"

export default defineConfig({
  tsr: {
    appDirectory: "./src",
    routesDirectory: "./src",
    generatedRouteTree: "./src/routes.gen.ts",
    addExtensions: true,
    virtualRouteConfig: routes,
  },
  routers: {
    client: {
      entry: "./src/entry.client.tsx",
    },
    ssr: {
      entry: "./src/entry.ssr.tsx",
    },
  },
  vite: {
    resolve: { alias: hq.get("rollup") },
  },
})
