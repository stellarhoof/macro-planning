import { StartClient } from "@tanstack/start"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { createRouter } from "./router.tsx"

const router = createRouter()

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
)
