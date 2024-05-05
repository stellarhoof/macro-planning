/* @refresh reload */

import { fromSnapshot } from "mobx-keystone"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App.tsx"
import { snapshot } from "./snapshot.ts"
import { AppStore } from "./store.ts"

const store = fromSnapshot(AppStore, snapshot)

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
)

if (import.meta.hot) {
  import.meta.hot.accept()
}
