import { runInAction } from "mobx"
import { chakra } from "@chakra-ui/react"
import { Field } from "./Field.jsx"

export const Form = ({ form, ...props }) => (
  <chakra.form
    noValidate
    onSubmit={async (e) => {
      e.preventDefault()
      try {
        runInAction(() => (form.isSubmitting = true))
        await form.requestSubmit()
      } catch (e) {
        console.error(e)
        form.setCustomValidity(e)
      } finally {
        runInAction(() => (form.isSubmitting = false))
      }
    }}
    {...props}
  >
    <Field field={form} />
  </chakra.form>
)
