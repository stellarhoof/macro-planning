import { twMerge } from "tailwind-merge"

import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { Fieldset } from "#ui-rats/rats/Field.tsx"

import { useFieldContext } from "../contexts.ts"
import { useAppForm } from "../hooks.ts"
import {
  commonFieldProps,
  getFieldSchema,
  getFormSchema,
  getSchema,
} from "../util.ts"

interface JsonSchemaArrayFieldProps {
  className?: string
}

export function JsonSchemaArrayField<T = unknown>(
  props: JsonSchemaArrayFieldProps,
) {
  const field = useFieldContext<(T | undefined)[]>()
  const fieldSchema = getFieldSchema(field, ["array"])
  const form = field.form as ReturnType<typeof useAppForm>
  return (
    <Fieldset
      label={fieldSchema.title}
      description={fieldSchema.description}
      {...commonFieldProps(field)}
    >
      <div {...props} className={twMerge("grid gap-4", props.className)}>
        <Button className="self-end" onPress={() => field.pushValue(undefined)}>
          Add Item
        </Button>
        {(field.state.value ?? []).map((_, i) => {
          const name = field.name ? `${field.name}[${i}]` : `[${i}]`
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
