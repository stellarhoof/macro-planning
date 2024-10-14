import { defineConfig } from "@tanstack/start/config"

export default defineConfig({
  tsr: {
    appDirectory: "./src",
    generatedRouteTree: "./src/routeTree.gen.ts",
    routesDirectory: "./src/routes",
  },
  routers: {
    client: {
      entry: "./src/client.tsx",
    },
    ssr: {
      entry: "./src/ssr.tsx",
    },
  },
})
