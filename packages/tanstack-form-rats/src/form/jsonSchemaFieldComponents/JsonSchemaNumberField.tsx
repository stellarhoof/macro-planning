import { useFieldContext } from "../contexts.ts"
import {
  NumberField,
  type NumberFieldProps,
} from "../fieldComponents/NumberField.tsx"
import { getFieldSchema } from "../util.ts"

export function JsonSchemaNumberField(props: NumberFieldProps) {
  const field = useFieldContext<number>()
  const schema = getFieldSchema(field, ["number"])
  const minValue =
    schema.minimum ??
    (schema.exclusiveMinimum ? schema.exclusiveMinimum + 1 : undefined)
  const maxValue =
    schema.maximum ??
    (schema.exclusiveMaximum ? schema.exclusiveMaximum - 1 : undefined)
  return (
    <NumberField
      label={schema.title}
      description={schema.description}
      step={schema.multipleOf}
      minValue={minValue}
      maxValue={maxValue}
      {...props}
    />
  )
}
