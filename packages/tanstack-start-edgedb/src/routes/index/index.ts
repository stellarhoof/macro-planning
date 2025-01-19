import { createFileRoute } from "@tanstack/react-router"

function Component() {
  return "Welcome!!"
}

export const Route = createFileRoute("/")({
  component: Component,
})
