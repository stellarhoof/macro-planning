import {
  ScrollRestoration,
  useLocation,
  useRouter,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import type { ReactNode } from "react"
import { RouterProvider } from "react-aria-components"

import { Tab, TabList, TabPanel, Tabs } from "#ui-rats/rats/navigation/Tabs.tsx"

function Navigation({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname })
  return (
    <Tabs selectedKey={pathname}>
      <TabList aria-label="Tabs">
        <Tab id="/" href="/">
          Home
        </Tab>
        <Tab id="/foods" href="/foods">
          Foods
        </Tab>
        <Tab id="/help" href="/help">
          Help
        </Tab>
      </TabList>
      <TabPanel id={pathname}>{children}</TabPanel>
    </Tabs>
  )
}

export function Document({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <RouterProvider
      navigate={(to, options = {}) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      <Navigation>{children}</Navigation>
      <ScrollRestoration />
      <TanStackRouterDevtools position="bottom-right" />
    </RouterProvider>
  )
}
