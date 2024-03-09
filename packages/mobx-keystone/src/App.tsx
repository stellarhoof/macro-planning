import { type DataTab, DataTabs } from "#ui/DataTabs.jsx"

import { Foods } from "./Foods.jsx"
import { Help } from "./Help.jsx"
import type { AppStore } from "./store.js"

function createTabs(store: AppStore): DataTab[] {
  return [
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
  ]
}

type Props = { store: AppStore }

export function App({ store }: Props) {
  return (
    <DataTabs defaultSelectedKey="foods" createTabs={() => createTabs(store)} />
  )
}
