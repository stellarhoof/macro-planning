import { runInAction } from "mobx"
import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { chakra, Button, Flex, Heading } from "@chakra-ui/react"
import {
  AddSchemaItem,
  SchemaFieldControl,
  SchemaTitle,
  SchemaDescription,
  SchemaFieldErrors,
  SchemaFieldsGrid,
} from "./Field.jsx"

const onSubmit = (schema, submit) => async (e) => {
  e.preventDefault()
  let isValid
  try {
    isValid = schema.field.reportValidity()
    runInAction(() => (schema.field.isSubmitting = true))
    if (isValid) await submit(schema)
  } catch (e) {
    console.error(e)
    schema.field.setCustomValidity(e)
  } finally {
    runInAction(() => (schema.field.isSubmitting = false))
  }
  if (!isValid) {
    e.target
      .querySelector(".chakra-form__error-message")
      ?.scrollIntoViewIfNeeded()
  }
}

const SubmitButton = observer(({ schema, ...props }) => (
  <Button
    type="submit"
    isLoading={schema.field.isSubmitting}
    loadingText="Saving..."
    {...props}
  />
))

export const Form = forwardRef(({ schema, submit, ...props }, ref) => (
  <chakra.form
    ref={ref}
    noValidate
    onSubmit={onSubmit(schema, submit)}
    {...props}
  >
    <SchemaFieldControl schema={schema}>
      <AddSchemaItem schema={schema} />
      <SchemaTitle as={Heading} schema={schema} />
      <SchemaDescription schema={schema} />
      <SchemaFieldsGrid schema={schema} />
      <Flex sx={{ gap: 8, justifyContent: "end" }}>
        <SubmitButton schema={schema}>Save</SubmitButton>
      </Flex>
      <SchemaFieldErrors schema={schema} />
    </SchemaFieldControl>
  </chakra.form>
))
