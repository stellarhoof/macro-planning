import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/start"
import { type FormEvent, startTransition, useActionState } from "react"
import { type ZodError, z } from "zod"
import { zfd } from "zod-form-data"
import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { Form } from "#ui-rats/rats/forms/Form.tsx"
import { TextField } from "#ui-rats/rats/forms/TextField.tsx"

const schema = zfd.formData({
  email: zfd.text(),
})

type Schema = z.infer<typeof schema>

interface Result {
  data?: Schema
  error?: {
    formErrors?: string[]
    fieldErrors?: Record<string, string[]>
  }
}

const signIn = createServerFn({ method: "POST" })
  .validator((formData: unknown): Result => {
    if (!(formData instanceof FormData)) {
      throw new Response("Invalid form data", { status: 400 })
    }
    const { data, error } = schema.safeParse(formData)
    return {
      data,
      error: error ? { ...(error as ZodError<Schema>).flatten() } : undefined,
    }
  })
  .handler((ctx): Result => {
    if (ctx.data.error) {
      return ctx.data
    }
    if (ctx.data.data) {
      console.log(ctx.data.data)
      return ctx.data
    }
    return ctx.data
    // await new Promise((r) => setTimeout(r, 1000))
    // // const { convexClient } = Route.useRouteContext()
    // // const user = await convexClient.mutation(api.functions.signIn, {
    // //   email: data.email,
    // // })
    // return {}
  })

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  // beforeLoad({ search }) {
  //   if (JSON.parse(localStorage.getItem("user") ?? "null")) {
  //     throw redirect({ to: search.redirect || "/foods" })
  //   }
  // },
  component: Component,
})

// https://rdrn.me/react-forms/
function Component() {
  const router = useRouter()
  const search = Route.useSearch()

  const [result, action, pending] = useActionState<Result, FormData>(
    (_state, formData) => signIn({ data: formData }),
    {},
  )

  if (result.data) {
    localStorage.setItem("user", JSON.stringify(result.data))
    router.navigate({ to: search.redirect || "/foods" })
  }

  // https://github.com/facebook/react/issues/29034
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(() => {
      action(new FormData(e.currentTarget))
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        className="w-80"
        onSubmit={onSubmit}
        validationErrors={result?.error?.fieldErrors}
      >
        <TextField label="Email" name="email" type="email" isRequired />
        <Button type="submit" isPending={pending}>
          Sign in
        </Button>
        {/* TODO: Clear under the same conditions as validationErrors */}
        {result?.error?.formErrors ? (
          <ul className="text-sm text-red-600">
            {result.error.formErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
      </Form>
    </div>
  )
}
