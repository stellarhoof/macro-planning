import {
  type NavigateOptions,
  type ToOptions,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router"
import { routeTree } from "./routes.gen.ts"

export function createRouter() {
  const router = createTanStackRouter({ routeTree })
  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions["to"]
    routerOptions: Omit<NavigateOptions, "to">
  }
}
