import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router"
import { Tab, TabList, TabPanel, Tabs } from "#ui-rats/rats/navigation/Tabs.tsx"

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ location }) => {
    if (!JSON.parse(localStorage.getItem("user") ?? "null")) {
      throw redirect({ to: "/login", search: { redirect: location.href } })
    }
  },
  component() {
    const pathname = useLocation({ select: (location) => location.pathname })
    return (
      <Tabs selectedKey={pathname}>
        <TabList aria-label="Tabs">
          <Tab id="/foods" href="/foods">
            Foods
          </Tab>
          <Tab id="/help" href="/help">
            Help
          </Tab>
          <Tab id="/logout" href="/logout">
            Sign Out
          </Tab>
        </TabList>
        <TabPanel id={pathname}>
          <Outlet />
        </TabPanel>
      </Tabs>
    )
  },
})
