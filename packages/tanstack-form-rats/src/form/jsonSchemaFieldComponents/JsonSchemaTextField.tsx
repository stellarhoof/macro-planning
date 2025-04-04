import { useFieldContext } from "../contexts.ts"
import {
  TextField,
  type TextFieldProps,
} from "../fieldComponents/TextField.tsx"
import { getFieldSchema } from "../util.ts"

export function JsonSchemaTextField(props: TextFieldProps) {
  const field = useFieldContext<string>()
  const schema = getFieldSchema(field, ["string"])
  return (
    <TextField
      label={schema.title}
      description={schema.description}
      pattern={schema.pattern}
      minLength={schema.minLength}
      maxLength={schema.maxLength}
      {...props}
    />
  )
}
