import React from "react"
import ReactDOM from "react-dom/client"
import { unprotect, onSnapshot } from "mobx-state-tree"
import { ChakraProvider } from "@chakra-ui/react"

import { App } from "./App.jsx"
import { theme } from "./theme.js"
import { Store } from "./store.js"

import { data } from "./data.js"
import { localStorage } from "./util.js"

const storeStorage = localStorage("store")
const store = Store.create({ ...data, ...storeStorage.get() })
onSnapshot(store, ({ foods, ...snap }) => storeStorage.set(snap))
unprotect(store)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App store={store} />
    </ChakraProvider>
  </React.StrictMode>,
)
