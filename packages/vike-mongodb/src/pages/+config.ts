import type { Config } from "vike/types"

// https://vike.dev/config
export default {
  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    // Make Layout only available in the client
    Layout: { env: { client: true } },
    // Make Page only available in the client
    Page: { env: { client: true } },
  },
} satisfies Config
