import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createRouter as createTanstackRouter,
  type NavigateOptions,
  type ToOptions,
} from "@tanstack/react-router"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { RouterProvider as RACRouterProvider } from "react-aria-components"

import { routeTree } from "./routes.gen.ts"

export function createRouter() {
  const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)
  const queryClient = new QueryClient({})
  const router = createTanstackRouter({
    routeTree,
    context: { queryClient, convexClient },
    defaultPreload: "intent",
    defaultErrorComponent() {
      return "[500] Error"
    },
    defaultNotFoundComponent() {
      return "[404] Not Found"
    },
    Wrap({ children }) {
      return (
        <ConvexProvider client={convexClient}>
          <QueryClientProvider client={queryClient}>
            <RACRouterProvider
              navigate={(to, options) => router.navigate({ to, ...options })}
              useHref={(to) => router.buildLocation({ to }).href}
            >
              {children}
            </RACRouterProvider>
          </QueryClientProvider>
        </ConvexProvider>
      )
    },
  })
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
