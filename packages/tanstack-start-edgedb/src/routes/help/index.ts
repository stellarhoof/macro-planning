import { createFileRoute } from "@tanstack/react-router"

export function Component() {
  return "Help!!"
}

export const Route = createFileRoute("/help")({
  component: Component,
})
