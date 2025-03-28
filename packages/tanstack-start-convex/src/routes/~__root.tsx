import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router"
import { Meta, Scripts } from "@tanstack/start"
import type { ConvexReactClient } from "convex/react"
import css from "./__root.css?url"

interface RouterContext {
  queryClient: QueryClient
  convexClient: ConvexReactClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head() {
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Macro Planning" },
      ],
      links: [{ rel: "stylesheet", href: css }],
    }
  },
  component() {
    return (
      <html lang="en">
        <head>
          <Meta />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    )
  },
})
