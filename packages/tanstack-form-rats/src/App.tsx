import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { startCase } from "es-toolkit"
import type { JSONSchema7 as JSONSchema } from "json-schema"
import type { FromSchema } from "json-schema-to-ts"
import type { CheckboxProps } from "react-aria-components"

import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { Checkbox } from "#ui-rats/rats/forms/Checkbox.tsx"
import {
  CheckboxGroup,
  type CheckboxGroupProps,
} from "#ui-rats/rats/forms/CheckboxGroup.tsx"
import { Form } from "#ui-rats/rats/forms/Form.tsx"
import {
  NumberField,
  type NumberFieldProps,
} from "#ui-rats/rats/forms/NumberField.tsx"
import {
  Radio,
  RadioGroup,
  type RadioGroupProps,
} from "#ui-rats/rats/forms/RadioGroup.tsx"
import {
  TextAreaField,
  type TextAreaProps,
  TextField,
  type TextFieldProps,
} from "#ui-rats/rats/forms/TextField.tsx"
import {
  ComboBox,
  ComboBoxItem,
  type ComboBoxProps,
} from "#ui-rats/rats/pickers/ComboBox.tsx"
import {
  Select,
  SelectItem,
  type SelectProps,
} from "#ui-rats/rats/pickers/Select.tsx"

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

interface Person extends FromSchema<typeof jsonSchema> {}

function FormTextField(props: TextFieldProps) {
  const field = useFieldContext<string>()
  return (
    <TextField
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormTextAreaField(props: TextAreaProps) {
  const field = useFieldContext<string>()
  return (
    <TextAreaField
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormNumberField(props: NumberFieldProps) {
  const field = useFieldContext<number>()
  return (
    <NumberField
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormSelectField<T extends object>(props: SelectProps<T>) {
  const field = useFieldContext<string>()
  return (
    <Select
      {...props}
      name={field.name}
      selectedKey={field.state.value}
      // @ts-expect-error
      onSelectionChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormCheckboxField(props: CheckboxProps) {
  const field = useFieldContext<boolean>()
  return (
    <Checkbox
      {...props}
      name={field.name}
      isSelected={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      // errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormCheckboxGroupField(props: CheckboxGroupProps) {
  const field = useFieldContext<string[]>()
  return (
    <CheckboxGroup
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormRadioGroupField(props: RadioGroupProps) {
  const field = useFieldContext<string>()
  return (
    <RadioGroup
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

function FormComboBoxField<T extends object>(props: ComboBoxProps<T>) {
  const field = useFieldContext<string>()
  return (
    <ComboBox
      {...props}
      name={field.name}
      selectedKey={field.state.value}
      // @ts-expect-error
      onSelectionChange={field.handleChange}
      onBlur={field.handleBlur}
      isInvalid={field.state.meta.errors.length > 0}
      errorMessage={field.state.meta.errors.join(", ")}
    />
  )
}

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField: FormTextField,
    TextAreaField: FormTextAreaField,
    NumberField: FormNumberField,
    SelectField: FormSelectField,
    CheckboxField: FormCheckboxField,
    CheckboxGroupField: FormCheckboxGroupField,
    RadioGroupField: FormRadioGroupField,
    ComboBoxField: FormComboBoxField,
  },
  formComponents: {},
})

export default function App() {
  const form = useAppForm({
    defaultValues: {} as Person,
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.AppField name="name">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <field.TextField
              label={schema.title}
              description={schema.description}
            />
          )
        }}
      </form.AppField>

      <form.AppField name="bio">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <field.TextAreaField
              label={schema.title}
              description={schema.description}
            />
          )
        }}
      </form.AppField>

      <form.AppField name="age">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return (
            <field.NumberField
              label={schema.title}
              description={schema.description}
            />
          )
        }}
      </form.AppField>

      <form.AppField name="subscribed">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          return <field.CheckboxField>{schema.title}</field.CheckboxField>
        }}
      </form.AppField>

      <form.AppField name="iceCreamFlavor">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          if (
            "enum" in schema &&
            schema.enum &&
            typeof schema.enum[0] === "string"
          ) {
            return (
              <field.SelectField
                label={schema.title}
                description={schema.description}
              >
                {schema.enum.map((id) => (
                  <SelectItem key={id} id={id}>
                    {startCase(id)}
                  </SelectItem>
                ))}
              </field.SelectField>
            )
          }
          return null
        }}
      </form.AppField>

      <form.AppField name="sports">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          if (
            "enum" in schema &&
            schema.enum &&
            typeof schema.enum[0] === "string"
          ) {
            return (
              <field.CheckboxGroupField
                label={schema.title}
                description={schema.description}
              >
                {schema.enum.map((id) => (
                  <Checkbox key={id} value={id}>
                    {startCase(id)}
                  </Checkbox>
                ))}
              </field.CheckboxGroupField>
            )
          }
          return null
        }}
      </form.AppField>

      <form.AppField name="pet">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          if (
            "enum" in schema &&
            schema.enum &&
            typeof schema.enum[0] === "string"
          ) {
            return (
              <field.RadioGroupField
                label={schema.title}
                description={schema.description}
              >
                {schema.enum.map((id) => (
                  <Radio key={id} value={id}>
                    {startCase(id)}
                  </Radio>
                ))}
              </field.RadioGroupField>
            )
          }
          return null
        }}
      </form.AppField>

      <form.AppField name="fruit">
        {(field) => {
          const schema =
            jsonSchema.properties[
              field.name as keyof typeof jsonSchema.properties
            ]
          if (
            "enum" in schema &&
            schema.enum &&
            typeof schema.enum[0] === "string"
          ) {
            return (
              <field.ComboBoxField
                label={schema.title}
                description={schema.description}
              >
                {schema.enum.map((id) => (
                  <ComboBoxItem key={id} id={id}>
                    {startCase(id)}
                  </ComboBoxItem>
                ))}
              </field.ComboBoxField>
            )
          }
          return null
        }}
      </form.AppField>

      <Button type="submit">Submit</Button>
    </Form>
  )
}
