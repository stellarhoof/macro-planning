import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/foods")({
  component() {
    return <div>Hello "/_auth/foods"!</div>
  },
})
