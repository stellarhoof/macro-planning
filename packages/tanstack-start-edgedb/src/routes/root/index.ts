import { createRootRoute } from "@tanstack/react-router"

import { Component } from "./Component.tsx"
import { Error_ } from "./Error.tsx"
import { NotFound } from "./NotFound.tsx"

export const Route = createRootRoute({
  component: Component,
  errorComponent: Error_,
  notFoundComponent: NotFound,
})
