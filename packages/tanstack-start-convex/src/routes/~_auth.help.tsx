import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/help")({
  component() {
    return <div>Hello "/_auth/help"!</div>
  },
})
