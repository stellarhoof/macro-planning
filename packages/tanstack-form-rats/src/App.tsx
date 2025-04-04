import type { JSONSchema7 as JSONSchema } from "json-schema"
import type { FromSchema } from "json-schema-to-ts"
import { Form } from "react-aria-components"

import { useAppForm } from "./form/index.ts"

const jsonSchema = {
  type: "object",
  required: ["name"],
  title: "Person",
  description: "Provides person details",
  properties: {
    name: {
      type: "string",
      title: "First name",
      description: "First name of the person",
    },
    bio: {
      type: "string",
      title: "Bio",
      description: "Short person's biography",
    },
    age: {
      type: "number",
      title: "Age",
      description: "Person's age in years",
    },
    dateOfBirth: {
      type: "string",
      title: "Date of birth",
      description: "Date this person was born at",
      format: "date-time",
    },
    subscribed: {
      type: "boolean",
      title: "Subscribed",
      description: "Whether this person has a subscription",
    },
    iceCreamFlavor: {
      type: "string",
      title: "Ice cream flavor",
      description: "Which ice cream flavor does this person prefer?",
      enum: ["chocolate", "mint", "strawberry", "vanilla"],
    },
    pet: {
      type: "string",
      title: "Pet",
      description: "Which pet does this person prefer?",
      enum: ["dog", "cat", "dragon"],
    },
    fruit: {
      type: "string",
      title: "Fruit",
      description: "Which fruit does this person prefer?",
      enum: ["apple", "orange", "banana", "watermelon"],
    },
    sports: {
      type: "array",
      title: "Sports",
      description: "Which sports does this person prefer?",
      items: {
        type: "string",
        enum: ["baseball", "tennis", "soccer"],
      },
    },
    addresses: {
      type: "array",
      title: "Addresses",
      description: "Addresses this person has lived at",
      items: {
        type: "string",
      },
    },
  },
} as const satisfies JSONSchema

interface Person extends FromSchema<typeof jsonSchema> {}

export default function App() {
  const form = useAppForm({
    defaultValues: {
      name: "Alejandro",
      addresses: ["336 Meridian Ave, Miami Beach", "4700 84th Ave, Doral"],
    } as Person,
    onSubmitMeta: { jsonSchema: jsonSchema as JSONSchema },
    onSubmit({ value }) {
      console.log(value)
    },
  })

  return (
    <Form
      className="max-w-lg m-auto flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.AppForm>
        <form.AppField name="">
          {(field) => <field.JsonSchemaField />}
        </form.AppField>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </Form>
  )
}
