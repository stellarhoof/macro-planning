import { DataTabs } from "#ui/DataTabs.tsx"

import { Foods } from "./Foods.tsx"
import { Help } from "./Help.tsx"
import type { AppStore } from "./store.ts"

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
