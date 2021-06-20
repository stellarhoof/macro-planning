import React from 'react'
import ReactDOM from 'react-dom'
import {
  extendTheme,
  ChakraProvider,
  Stack,
  TableCaption,
} from '@chakra-ui/react'
import { configure } from 'mobx'
import { unprotect, onSnapshot } from 'mobx-state-tree'
import dbModel from './dbModel'
import dbData from './dbData'
import Foods from './Foods'
import Meals from './Meals'

let storage = window.localStorage
let storedDb = storage.getItem('db')
let store = dbModel.create(
  storedDb ? { ...JSON.parse(storedDb), foods: dbData.foods } : dbData
)
onSnapshot(store, ({ foods, ...snap }) =>
  storage.setItem('db', JSON.stringify(snap))
)

// Do not complain when we mutate a mobx observable manually
configure({ enforceActions: 'never' })

// Allow mutating the store manually
unprotect(store)

let theme = extendTheme({
  fonts: { body: 'monospace' },
  components: {
    Heading: { defaultProps: { size: 'sm' } },
    Table: {
      defaultProps: { size: 'sm' },
      baseStyle: ({ colorScheme: c }) => ({
        caption: { bg: `${c}.100`, m: '0', fontWeight: 'bold' },
        tfoot: { bg: `${c}.50` },
      }),
      sizes: {
        sm: { caption: { fontSize: 'sm' } },
      },
    },
  },
})

TableCaption.defaultProps = { placement: 'top' }

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
    </Stack>
  </ChakraProvider>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept()
}
