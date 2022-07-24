import React from "react"
import ReactDOM from "react-dom/client"
import { onSnapshot } from "mobx-state-tree"
import { ChakraProvider, Stack } from "@chakra-ui/react"
import theme from "./theme.js"
import Foods from "./Foods.jsx"
import Meals from "./Meals.jsx"
import Help from "./Help.jsx"
import model from "./storeModel.js"
import data from "./storeData.js"
import { localStorage } from "./util.js"

const storeStorage = localStorage("store")
const store = model.create({ ...data, ...storeStorage.get() })
onSnapshot(store, ({ foods, ...snap }) => storeStorage.set(snap))

// import { UndoManager } from "mst-middlewares"
// // History
// let historyStorage = localStorage('history')
// let history = UndoManager.create(historyStorage.get(), {
//   targetStore: store,
//   maxHistoryLength: 50,
// })
// onSnapshot(history, historyStorage.set)

// // Setup app keymaps
// import { onKeyPress } from "./kbd"
// document.addEventListener('keypress', onKeyPress({ store, history }))

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Stack
        p="4"
        spacing="4"
        direction="row"
        h="100vh"
        sx={{ "> *": { maxH: "100%", overflowY: "scroll", flexShrink: 0 } }}
      >
        <Meals store={store} />
        <Foods store={store} />
        <Help />
      </Stack>
    </ChakraProvider>
  </React.StrictMode>,
)
