import { Outlet, createRootRoute } from "@tanstack/react-router"

import { Document } from "./Document.tsx"
import { Error_ } from "./Error.tsx"
import { NotFound } from "./NotFound.tsx"

export function Component() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export const Route = createRootRoute({
  component: Component,
  errorComponent: Error_,
  notFoundComponent: NotFound,
})
