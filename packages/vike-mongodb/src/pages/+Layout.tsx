import type { ReactNode } from "react"

import { DataTabs } from "#ui/DataTabs.jsx"

import { usePageContext } from "./PageContext.js"

export function Layout({ children }: { children: ReactNode }) {
  const { urlParsed } = usePageContext()
  return (
    <DataTabs
      selectedKey={urlParsed.pathname}
      tabs={[
        {
          value: "/foods",
          label: "Foods",
          href: "/foods",
          content: () => children,
        },
        {
          value: "/help",
          label: "Help",
          href: "/help",
          content: () => children,
        },
      ]}
    />
  )
}
