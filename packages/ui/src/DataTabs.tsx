import { type ReactNode, useMemo } from "react"

import type { TabsProps } from "./rats/Tabs.js"
import { Tab, TabList, TabPanel, Tabs } from "./rats/Tabs.js"

export type DataTab = {
  value: string
  label: ReactNode
  href?: string
  content?: () => ReactNode
}

export type DataTabsProps = TabsProps & {
  tabs?: DataTab[]
  defaultSelectedKey?: string
  createTabs?: () => DataTab[]
}

export function DataTabs({
  tabs: incomingTabs,
  createTabs,
  ...props
}: DataTabsProps) {
  const tabs = useMemo(
    () => incomingTabs ?? createTabs?.() ?? [],
    [incomingTabs, createTabs],
  )
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
