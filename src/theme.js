import { extendTheme, TableCaption } from "@chakra-ui/react"

TableCaption.defaultProps = { placement: "top" }

export default extendTheme({
  fonts: { body: "monospace" },
  components: {
    Heading: { defaultProps: { size: "sm" } },
    Table: {
      defaultProps: { size: "sm" },
      baseStyle: ({ colorScheme: c = "gray" }) => ({
        caption: { bg: `${c}.100`, m: "0", fontWeight: "bold" },
        thead: {
          position: "sticky",
          // https://css-tricks.com/making-tables-with-sticky-header-and-footers-got-a-bit-easier/
          insetBlockStart: 0,
          th: { bg: `${c}.100` },
        },
        tbody: { mark: { bg: "yellow" } },
        tfoot: { bg: `${c}.50` },
        th: {
          h: "10",
          whiteSpace: "nowrap",
          "&:first-of-type": { whiteSpace: "nowrap" },
        },
        td: { "&:first-of-type": { whiteSpace: "nowrap" } },
      }),
      sizes: {
        sm: { caption: { fontSize: "sm" } },
      },
    },
  },
})
