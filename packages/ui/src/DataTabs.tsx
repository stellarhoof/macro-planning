import type { ReactNode } from "react"

import * as _ from "radashi"

import type { TabsProps } from "./rats/navigation/Tabs.tsx"
import { Tab, TabList, TabPanel, Tabs } from "./rats/navigation/Tabs.tsx"

export type DataTab = {
  href?: string
  label?: ReactNode
  content?: () => ReactNode
}

interface DataTabsProps extends TabsProps {
  tabs: Record<string, DataTab>
}

export function DataTabs({ tabs, ...props }: DataTabsProps) {
  const defs = Object.entries(tabs).map(([id, col]) => ({
    id,
    label: _.title(id),
    ...col,
  }))
  return (
    <Tabs {...props}>
      <TabList>
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
