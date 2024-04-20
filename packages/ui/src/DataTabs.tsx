import type { ReactNode } from "react"

import type { TabsProps } from "./rats/Tabs.js"
import { Tab, TabList, TabPanel, Tabs } from "./rats/Tabs.js"

export type DataTab = {
  value: string
  label: ReactNode
  href?: string
  content?: () => ReactNode
}

interface DataTabsProps extends TabsProps {
  tabs: DataTab[]
}

export function DataTabs({ tabs, ...props }: DataTabsProps) {
  return (
    <Tabs {...props}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.value} id={tab.value} href={tab.href}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.value} id={tab.value}>
          {tab.content?.()}
        </TabPanel>
      ))}
    </Tabs>
  )
}
