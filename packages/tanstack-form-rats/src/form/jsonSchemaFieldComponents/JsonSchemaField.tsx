import type { ReactNode } from "react"

import { useFieldContext } from "../contexts.ts"
import { getFieldSchema, isArraySchema, schemaHasEnum } from "../util.ts"
import { JsonSchemaArrayField } from "./JsonSchemaArrayField.tsx"
import { JsonSchemaCheckboxField } from "./JsonSchemaCheckboxField.tsx"
import { JsonSchemaCheckboxGroupField } from "./JsonSchemaCheckboxGroupField.tsx"
import { JsonSchemaDatePickerField } from "./JsonSchemaDatePickerField.tsx"
import { JsonSchemaNumberField } from "./JsonSchemaNumberField.tsx"
import { JsonSchemaObjectField } from "./JsonSchemaObjectField.tsx"
import { JsonSchemaSelectField } from "./JsonSchemaSelectField.tsx"
import { JsonSchemaTextField } from "./JsonSchemaTextField.tsx"

interface JsonSchemaFieldProps {
  className?: string
}

export function JsonSchemaField(props: JsonSchemaFieldProps): ReactNode {
  const field = useFieldContext<unknown>()
  const schema = getFieldSchema(field)
  if (schemaHasEnum(schema)) {
    return <JsonSchemaSelectField {...props} />
  }
  if (isArraySchema(schema) && schemaHasEnum(schema.items)) {
    return <JsonSchemaCheckboxGroupField {...props} />
  }
  if (schema.type === "object") {
    return <JsonSchemaObjectField {...props} />
  }
  if (schema.type === "array") {
    return <JsonSchemaArrayField {...props} />
  }
  if (schema.type === "boolean") {
    return <JsonSchemaCheckboxField {...props} />
  }
  if (schema.type === "number") {
    return <JsonSchemaNumberField {...props} />
  }
  if (schema.type === "string") {
    if (schema.format === "date-time") {
      return <JsonSchemaDatePickerField {...props} />
    }
    return <JsonSchemaTextField {...props} />
  }
  return null
}
