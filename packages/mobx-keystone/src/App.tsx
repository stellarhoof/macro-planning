import { DataTabs } from "#ui/DataTabs.jsx"

import { Foods } from "./Foods.jsx"
import { Help } from "./Help.jsx"
import type { AppStore } from "./store.js"

interface Props {
  store: AppStore
}

export function App({ store }: Props) {
  return (
    <DataTabs
      defaultSelectedKey="foods"
      tabs={[
        {
          value: "foods",
          label: "Foods",
          content: () => <Foods store={store} />,
        },
        {
          value: "help",
          label: "Help",
          content: () => <Help />,
        },
      ]}
    />
  )
}
