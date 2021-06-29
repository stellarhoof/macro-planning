import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, Stack } from '@chakra-ui/react'
import { UndoManager } from 'mst-middlewares'
import { onSnapshot } from 'mobx-state-tree'
import model from './storeModel'
import data from './storeData'
import Foods from './Foods'
import Meals from './Meals'
import Help from './Help'
import theme from './theme'
import { onKeyPress } from './kbd'
import { localStorage } from './util'

// Store
let storeStorage = localStorage('store')
let store = model.create({ ...data, ...storeStorage.get() })
onSnapshot(store, ({ foods, ...snap }) => storeStorage.set(snap))

// // History
// let historyStorage = localStorage('history')
// let history = UndoManager.create(historyStorage.get(), {
//   targetStore: store,
//   maxHistoryLength: 50,
// })
// onSnapshot(history, historyStorage.set)

// // Setup app keymaps
// document.addEventListener('keypress', onKeyPress({ store, history }))

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Stack
      p="4"
      spacing="4"
      direction="row"
      h="100vh"
      sx={{
        '> *': {
          maxH: '100%',
          overflowY: 'scroll',
          flexShrink: 0,
        },
      }}
    >
      <Meals store={store} />
      <Foods store={store} />
      <Help store={store} />
    </Stack>
  </ChakraProvider>,
  document.getElementById('root')
)
