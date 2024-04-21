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
      tabs={{
        foods: { content: () => <Foods store={store} /> },
        help: { content: () => <Help /> },
      }}
    />
  )
}
