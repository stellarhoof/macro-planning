import { extendTheme, TableCaption } from "@chakra-ui/react"

TableCaption.defaultProps = { placement: "top" }

export const theme = extendTheme({
  styles: {
    global: {
      "fieldset.chakra-form-control": {
        p: 3,
        borderRadius: "base",
        borderWidth: "1px",
        borderColor: "gray.300",
        "> [aria-label=Actions]": {
          pos: "absolute",
          top: -3,
          right: 0,
          zIndex: 2,
        },
      },
    },
  },
  components: {
    Heading: { defaultProps: { size: "sm" } },
    Table: {
      defaultProps: { size: "sm" },
      baseStyle: ({ colorScheme: c = "gray" }) => ({
        caption: { bg: `${c}.100`, m: "0", fontWeight: "bold" },
        thead: {
          zIndex: 1,
          position: "sticky",
          // https://css-tricks.com/making-tables-with-sticky-header-and-footers-got-a-bit-easier/
          insetBlockStart: 0,
          th: {
            h: 10,
            bg: `${c}.100`,
            borderBottom: "1px solid",
            borderColor: `${c}.200`,
          },
        },
        tfoot: {
          th: { h: 10, bg: `${c}.50` },
        },
      }),
      sizes: {
        sm: { caption: { fontSize: "sm" } },
      },
    },
  },
})
