import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext } from "@tanstack/react-router"
import { Component } from "./Component.tsx"
import { Error_ } from "./Error.tsx"
import { NotFound } from "./NotFound.tsx"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Component,
    errorComponent: Error_,
    notFoundComponent: NotFound,
  },
)
