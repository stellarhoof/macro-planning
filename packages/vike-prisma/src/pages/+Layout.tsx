import type { ReactNode } from "react"

import { DataTabs } from "#ui/DataTabs.jsx"

import { usePageContext } from "./PageContext.js"

export function Layout({ children }: { children: ReactNode }) {
  const { urlParsed } = usePageContext()
  return (
    <DataTabs
      selectedKey={urlParsed.pathname}
      tabs={{
        foods: { href: "/foods", content: () => children },
        help: { href: "/help", content: () => children },
      }}
    />
  )
}
