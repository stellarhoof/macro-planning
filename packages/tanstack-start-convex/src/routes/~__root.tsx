import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, HeadContent } from "@tanstack/react-router"

import { ConvexClientProvider } from "#src/integrations/convex/provider.tsx"
import { RacRouterProvider } from "#src/integrations/react-aria-components/provider.tsx"
import TanStackQueryProvider from "#src/integrations/tanstack-query/provider.tsx"

import styles from "../styles.css?url"

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Macro Planning" },
    ],
    links: [{ rel: "stylesheet", href: styles }],
  }),
  shellComponent({ children }) {
    return (
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <ConvexClientProvider>
            <TanStackQueryProvider>
              <RacRouterProvider>{children}</RacRouterProvider>
            </TanStackQueryProvider>
          </ConvexClientProvider>
        </body>
      </html>
    )
  },
})
