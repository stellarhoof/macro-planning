import { getRouterManifest } from "@tanstack/start/router-manifest"
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server"

import { createRouter } from "./router.tsx"

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler)
