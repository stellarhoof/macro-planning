import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { useMutation } from "convex/react"
import { useCallback } from "react"
import { z } from "zod"
import { api } from "#convex/_generated/api.js"

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad({ search }) {
    if (JSON.parse(localStorage.getItem("user") ?? "null")) {
      throw redirect({ to: search.redirect || "/foods" })
    }
  },
  component: Component,
})

function Component() {
  const router = useRouter()
  const search = Route.useSearch()
  const signIn = useMutation(api.functions.signIn)

  const action = useCallback(async (formData: FormData) => {
    const email = formData.get("email")
    if (email) {
      const user = await signIn({ email: email.toString() })
      console.log({ user })
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        await router.navigate({ to: search.redirect || "/foods" })
      }
    }
  }, [])

  return (
    <form action={action}>
      <input name="email" />
      <button type="submit">Sign in</button>
    </form>
  )
}
