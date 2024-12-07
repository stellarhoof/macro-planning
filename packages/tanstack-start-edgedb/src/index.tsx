import {
  type NavigateOptions,
  RouterProvider,
  type ToOptions,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { routeTree } from "./routes.gen.ts"

const router = createTanStackRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions["to"]
    routerOptions: Omit<NavigateOptions, "to">
  }
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
