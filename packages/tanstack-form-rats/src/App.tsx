import { type Validator, useForm } from "@tanstack/react-form"
import { Ajv } from "ajv"
import { startCase } from "es-toolkit"
import type { FromSchema, JSONSchema } from "json-schema-to-ts"
import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { Checkbox } from "#ui-rats/rats/forms/Checkbox.tsx"
import { CheckboxGroup } from "#ui-rats/rats/forms/CheckboxGroup.tsx"
import { Form } from "#ui-rats/rats/forms/Form.tsx"
import { NumberField } from "#ui-rats/rats/forms/NumberField.tsx"
import { Radio, RadioGroup } from "#ui-rats/rats/forms/RadioGroup.tsx"
import { TextAreaField, TextField } from "#ui-rats/rats/forms/TextField.tsx"
import { ComboBox, ComboBoxItem } from "#ui-rats/rats/pickers/ComboBox.tsx"
import { Select, SelectItem } from "#ui-rats/rats/pickers/Select.tsx"

const jsonSchema = {
  type: "object",
  required: ["name"],
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
    pet: {
      type: "string",
      title: "Fruit",
      description: "Which pet does this person prefer?",
      enum: ["dog", "cat", "dragon"],
    },
  },
} as const satisfies JSONSchema

interface FormValue extends FromSchema<typeof jsonSchema> {}

function ajvValidator(ajv: Ajv): Validator<unknown, JSONSchema> {
  return () => ({
    validate({ value, validationSource }, schema) {
      console.log(validationSource)
      const valid = ajv.validate(schema, value)
      if (!valid) {
        console.log("sync", ajv.errors)
        return { form: "Error", fields: { name: "Error" } }
      }
    },
    async validateAsync({ value }, schema) {
      const valid = ajv.validate(schema, value)
      if (!valid) {
        console.log("async", ajv.errors)
        return { form: "Error", fields: { name: "Error" } }
      }
    },
  })
}

export default function App() {
  const validatorAdapter = ajvValidator(new Ajv())
  const form = useForm<FormValue, typeof validatorAdapter>({
    validators: { onSubmit: jsonSchema },
    validatorAdapter,
  })
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="name"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <TextField
              label={schema.title}
              description={schema.description}
              name={field.name}
              value={field.state.value ?? ""}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            />
          )
        }}
      />

      <form.Field
        name="bio"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <TextAreaField
              label={schema.title}
              description={schema.description}
              name={field.name}
              value={field.state.value ?? ""}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            />
          )
        }}
      />

      <form.Field
        name="age"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <NumberField
              label={schema.title}
              description={schema.description}
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            />
          )
        }}
      />

      <form.Field
        name="subscribed"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <Checkbox
              name={field.name}
              isSelected={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              // description="Whether this person is subscribed"
              // errorMessage={field.state.meta.errors.join(", ")}
            >
              {schema.title}
            </Checkbox>
          )
        }}
      />

      <form.Field
        name="iceCreamFlavor"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <Select
              label={schema.title}
              description={schema.description}
              name={field.name}
              selectedKey={field.state.value}
              // @ts-expect-error
              onSelectionChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            >
              {("enum" in schema ? schema.enum : []).map((id) => (
                <SelectItem key={id} id={id}>
                  {startCase(id)}
                </SelectItem>
              ))}
            </Select>
          )
        }}
      />

      <form.Field
        name="sports"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <CheckboxGroup
              label={schema.title}
              description={schema.description}
              name={field.name}
              value={field.state.value}
              // @ts-expect-error
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            >
              {("items" in schema && "enum" in schema.items
                ? schema.items.enum
                : []
              ).map((id) => (
                <Checkbox key={id} value={id}>
                  {startCase(id)}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )
        }}
      />

      <form.Field
        name="pet"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <RadioGroup
              label={schema.title}
              description={schema.description}
              name={field.name}
              value={field.state.value}
              // @ts-expect-error
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            >
              {("enum" in schema ? schema.enum : []).map((id) => (
                <Radio key={id} value={id}>
                  {startCase(id)}
                </Radio>
              ))}
            </RadioGroup>
          )
        }}
      />

      <form.Field
        name="fruit"
        // biome-ignore lint/correctness/noChildrenProp: ignore
        children={(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <ComboBox
              label={schema.title}
              description={schema.description}
              name={field.name}
              selectedKey={field.state.value}
              // @ts-expect-error
              onSelectionChange={field.handleChange}
              onBlur={field.handleBlur}
              isInvalid={field.state.meta.errors.length > 0}
              errorMessage={field.state.meta.errors.join(", ")}
            >
              {("enum" in schema ? schema.enum : []).map((id) => (
                <ComboBoxItem key={id} id={id}>
                  {startCase(id)}
                </ComboBoxItem>
              ))}
            </ComboBox>
          )
        }}
      />

      <Button type="submit">Submit</Button>
    </Form>
  )
}
