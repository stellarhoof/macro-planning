import type { QueryClient } from "@tanstack/react-query"
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import type { ReactNode } from "react"

function Document({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ScrollRestoration />
    </>
  )
}

function NotFound() {
  return <>Not Found</>
}

function Error_() {
  return <Document>Error</Document>
}

function Component() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Component,
    errorComponent: Error_,
    notFoundComponent: NotFound,
  },
)
