import { useFieldContext } from "../contexts.ts"
import {
  TextAreaField,
  type TextAreaFieldProps,
} from "../fieldComponents/TextAreaField.tsx"
import { getFieldSchema } from "../util.ts"

export function JsonSchemaTextAreaField(props: TextAreaFieldProps) {
  const field = useFieldContext<string>()
  const schema = getFieldSchema(field, ["string"])
  return (
    <TextAreaField
      label={schema.title}
      description={schema.description}
      pattern={schema.pattern}
      minLength={schema.minLength}
      maxLength={schema.maxLength}
      {...props}
    />
  )
}
