import { extendTheme, TableCaption } from './pkg/@chakra-ui/react.js'

TableCaption.defaultProps = { placement: 'top' }

export default extendTheme({
  fonts: { body: 'monospace' },
  components: {
    Heading: { defaultProps: { size: 'sm' } },
    Table: {
      defaultProps: { size: 'sm' },
      baseStyle: ({ colorScheme: c }) => ({
        caption: { bg: `${c}.100`, m: '0', fontWeight: 'bold' },
        tfoot: { bg: `${c}.50` },
        thead: { th: { bg: `${c}.100` } },
      }),
      sizes: {
        sm: { caption: { fontSize: 'sm' } },
      },
    },
  },
})
