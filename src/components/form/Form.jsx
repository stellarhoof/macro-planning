import { runInAction } from "mobx"
import { forwardRef } from "react"
import { chakra, Button, Flex, Heading } from "@chakra-ui/react"
import {
  AddField,
  FieldControl,
  FieldLabel,
  FieldDescription,
  FieldErrors,
  FieldsGrid,
} from "./Field.jsx"
import { observer } from "mobx-react-lite"

const onSubmit = (form) => async (e) => {
  e.preventDefault()
  try {
    runInAction(() => (form.isSubmitting = true))
    await form.submit()
  } catch (e) {
    console.error(e)
    form.setCustomValidity(e)
  } finally {
    runInAction(() => (form.isSubmitting = false))
  }
  if (!form.checkValidity()) {
    e.target
      .querySelector(".chakra-form__error-message")
      ?.scrollIntoViewIfNeeded()
  }
}

const SubmitButton = observer(({ form, ...props }) => (
  <Button
    type="submit"
    isLoading={form.isSubmitting}
    loadingText="Saving..."
    {...props}
  />
))

export const Form = forwardRef(({ form, ...props }, ref) => (
  <chakra.form ref={ref} noValidate onSubmit={onSubmit(form)} {...props}>
    <FieldControl field={form}>
      <AddField field={form} />
      <FieldLabel as={Heading} field={form} />
      <FieldDescription field={form} />
      <FieldsGrid field={form} />
      <Flex sx={{ gap: 8, justifyContent: "end" }}>
        <SubmitButton form={form}>Save</SubmitButton>
      </Flex>
      <FieldErrors field={form} />
    </FieldControl>
  </chakra.form>
))
