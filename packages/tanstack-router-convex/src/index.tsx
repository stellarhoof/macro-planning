import { ConvexQueryClient } from "@convex-dev/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import { routeTree } from "./routes.gen.ts"

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

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Make `queryClient` available in route loaders.
  context: { queryClient },
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <ConvexProvider client={convex}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ConvexProvider>
    </StrictMode>,
  )
}
