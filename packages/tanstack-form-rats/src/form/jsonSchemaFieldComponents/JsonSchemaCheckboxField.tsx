import { useFieldContext } from "../contexts.ts"
import {
  CheckboxField,
  type CheckboxFieldProps,
} from "../fieldComponents/CheckboxField.tsx"
import { getFieldSchema } from "../util.ts"

export function JsonSchemaCheckboxField(props: CheckboxFieldProps) {
  const field = useFieldContext<boolean>()
  const schema = getFieldSchema(field, ["boolean"])
  return (
    <CheckboxField description={schema.description} {...props}>
      {schema.title}
    </CheckboxField>
  )
}
