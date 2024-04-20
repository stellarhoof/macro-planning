import {
  type Root as RootNode,
  createRoot,
  hydrateRoot,
} from "react-dom/client"
import type { PageContextClient } from "vike/types"

import { Root } from "./Root.jsx"

let root: RootNode

// https://vike.dev/onRenderClient
export const onRenderClient = (context: PageContextClient) => {
  const container = document.getElementById("root")
  if (container) {
    // Hydrate the container if the server rendered the page inside it.
    const shouldHydrate = context.isHydration && container.innerHTML !== ""
    if (shouldHydrate) {
      root = hydrateRoot(container, <Root context={context} />)
    } else {
      root ??= createRoot(container)
      root.render(<Root context={context} />)
    }
  }
}
