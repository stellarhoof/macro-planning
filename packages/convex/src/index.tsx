import { ConvexProvider, ConvexReactClient } from "convex/react"
import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const root = document.getElementById("root")

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </React.StrictMode>,
  )
}
