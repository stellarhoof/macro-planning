import type { ReactNode } from "react"

import { startCase } from "es-toolkit"
import type { TabsProps } from "./rats/navigation/Tabs.tsx"
import { Tab, TabList, TabPanel, Tabs } from "./rats/navigation/Tabs.tsx"

export type DataTab = {
  id: string
  href?: string
  label?: ReactNode
  content?: () => ReactNode
}

interface DataTabsProps extends TabsProps {
  tabs: DataTab[]
}

export function DataTabs({ tabs, ...props }: DataTabsProps) {
  const defs = tabs.map((col) => ({ label: startCase(col.id), ...col }))
  return (
    <Tabs {...props}>
      <TabList aria-label="tabs">
        {defs.map((tab) => (
          <Tab key={tab.id} id={tab.id} href={tab.href}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {defs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id}>
          {tab.content?.()}
        </TabPanel>
      ))}
    </Tabs>
  )
}
