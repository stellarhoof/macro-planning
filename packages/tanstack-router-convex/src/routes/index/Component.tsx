import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { api } from "../../../convex/_generated/api.js"

export function Component() {
  console.log(convexQuery(api.functions.getUser, { email: "admin@email.com" }))
  const { data } = useSuspenseQuery(
    convexQuery(api.functions.getUser, { email: "admin@email.com" }),
  )
  return <div>{JSON.stringify(data)}</div>
}
