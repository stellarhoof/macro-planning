import { ConvexQueryClient } from "@convex-dev/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  type NavigateOptions,
  RouterProvider,
  type ToOptions,
} from "@tanstack/react-router"
import {
  Outlet,
  ScrollRestoration,
  createRouter as createTanstackRouter,
} from "@tanstack/react-router"
import { StrictMode } from "react"
import { RouterProvider as RACRouterProvider } from "react-aria-components"
import { createRoot } from "react-dom/client"
import { routeTree } from "./routes.gen.ts"

import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

// https://docs.convex.dev/client/tanstack-query
const convexQueryClient = new ConvexQueryClient(convex)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
})

convexQueryClient.connect(queryClient)

export const router = createTanstackRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultErrorComponent() {
    return <>Error</>
  },
  defaultNotFoundComponent() {
    return <>Not Found</>
  },
  defaultComponent() {
    return (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    )
  },
})

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

const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <ConvexProvider client={convex}>
        <QueryClientProvider client={queryClient}>
          <RACRouterProvider
            navigate={(to, options) => router.navigate({ to, ...options })}
            useHref={(to) => router.buildLocation({ to }).href}
          >
            <RouterProvider router={router} />
          </RACRouterProvider>
        </QueryClientProvider>
      </ConvexProvider>
    </StrictMode>,
  )
}
