import { twMerge } from "tailwind-merge"

import { Fieldset } from "#ui-rats/rats/Field.tsx"

import { useFieldContext } from "../contexts.ts"
import { useAppForm } from "../hooks.ts"
import {
  commonFieldProps,
  getFieldSchema,
  getFormSchema,
  getSchema,
} from "../util.ts"

interface JsonSchemaObjectFieldProps {
  className?: string
}

export function JsonSchemaObjectField(props: JsonSchemaObjectFieldProps) {
  const field = useFieldContext<object>()
  const fieldSchema = getFieldSchema(field, ["object"])
  const form = field.form as ReturnType<typeof useAppForm>
  return (
    <Fieldset
      label={fieldSchema.title}
      description={fieldSchema.description}
      {...commonFieldProps(field)}
    >
      <div {...props} className={twMerge("grid gap-4", props.className)}>
        {Object.keys(fieldSchema.properties ?? {}).map((key) => {
          const name = field.name ? `${field.name}.${key}` : key
          const schema = getSchema(name, getFormSchema(field.form))
          return (
            <form.AppField
              key={name}
              name={name}
              mode={schema.type === "array" ? "array" : "value"}
            >
              {(field) => <field.JsonSchemaField />}
            </form.AppField>
          )
        })}
      </div>
    </Fieldset>
  )
}
