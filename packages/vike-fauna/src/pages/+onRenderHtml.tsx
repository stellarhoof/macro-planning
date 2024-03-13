import { readFile } from "node:fs/promises"

import { renderToString } from "react-dom/server"
import { dangerouslySkipEscape } from "vike/server"
import type { PageContextServer } from "vike/types"

import { Root } from "./Root.jsx"

const index = await readFile("index.html", { encoding: "utf-8" })

// https://vike.dev/onRenderHtml
// https://vike.dev/render-modes
export const onRenderHtml = async (context: PageContextServer) => {
  const page = renderToString(<Root context={context} />)
  const html = index.replace(
    '<div id="root"></div>',
    `<div id="root">${page}</div>`,
  )
  return dangerouslySkipEscape(html)
}
