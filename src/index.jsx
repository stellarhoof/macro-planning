import React from "react"
import ReactDOM from "react-dom/client"
import { unprotect, onSnapshot } from "mobx-state-tree"
import { ChakraProvider, Stack } from "@chakra-ui/react"
import theme from "./theme.js"
import Foods from "./Foods.jsx"
import Meals from "./Meals.jsx"
import Help from "./Help.jsx"
import TableWrapper from "./TableWrapper.jsx"
import model from "./model.js"
import data from "./data.js"
import { localStorage } from "./util.js"

const storeStorage = localStorage("store")
const store = model.create({ ...data, ...storeStorage.get() })
onSnapshot(store, ({ foods, ...snap }) => storeStorage.set(snap))
unprotect(store)

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
        <TableWrapper>
          <Meals store={store} />
        </TableWrapper>
        <TableWrapper>
          <Foods store={store} />
        </TableWrapper>
        <Help />
      </Stack>
    </ChakraProvider>
  </React.StrictMode>,
)
