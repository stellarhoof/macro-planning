import type { ReactNode } from "react"

import { DataTabs } from "#ui/DataTabs.tsx"

import { usePageContext } from "./PageContext.ts"

export function Layout({ children }: { children: ReactNode }) {
  const { urlParsed } = usePageContext()
  return (
    <DataTabs
      selectedKey={urlParsed.pathname}
      tabs={[
        { id: "foods", href: "/foods", content: () => children },
        { id: "help", href: "/help", content: () => children },
      ]}
    />
  )
}
