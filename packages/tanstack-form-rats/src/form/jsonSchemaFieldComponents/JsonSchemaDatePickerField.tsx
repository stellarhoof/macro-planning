import { useFieldContext } from "../contexts.ts"
import {
  DatePickerField,
  type DatePickerFieldProps,
} from "../fieldComponents/DatePickerField.tsx"
import { getFieldSchema } from "../util.ts"

export function JsonSchemaDatePickerField(props: DatePickerFieldProps) {
  const field = useFieldContext<string>()
  const schema = getFieldSchema(field, ["string"])
  return (
    <DatePickerField
      label={schema.title}
      description={schema.description}
      {...props}
    />
  )
}
