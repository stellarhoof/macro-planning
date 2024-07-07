/**
 * See https://remix.run/file-conventions/root
 */

import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react"
import { Tab, TabList, TabPanel, Tabs } from "#ui/rats/navigation/Tabs.tsx"
import rootCss from "./root.css?url"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: rootCss }]

// See https://remix.run/docs/en/main/file-conventions/root#layout-export
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <Tabs selectedKey={pathname}>
      <TabList aria-label="Tabs">
        <Tab id="/foods" href="/foods">
          Foods
        </Tab>
        <Tab id="/help" href="/help">
          Help
        </Tab>
      </TabList>
      <TabPanel id={pathname}>
        <Outlet />
      </TabPanel>
    </Tabs>
  )
}
