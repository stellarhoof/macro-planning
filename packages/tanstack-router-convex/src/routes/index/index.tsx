import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { api } from "#convex/_generated/api.js"

function Component() {
  console.log(convexQuery(api.functions.getUser, { email: "admin@email.com" }))
  const { data } = useSuspenseQuery(
    convexQuery(api.functions.getUser, { email: "admin@email.com" }),
  )
  return <div>{JSON.stringify(data)}</div>
}

export const Route = createFileRoute("/")({
  component: Component,
})
