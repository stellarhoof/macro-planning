import { Checkbox } from "#ui-rats/rats/forms/Checkbox.tsx"

import { useFieldContext } from "../contexts.ts"
import {
  CheckboxGroupField,
  type CheckboxGroupFieldProps,
} from "../fieldComponents/CheckboxGroupField.tsx"
import { getFieldSchema, getSelectionItems } from "../util.ts"

export function JsonSchemaCheckboxGroupField(props: CheckboxGroupFieldProps) {
  const field = useFieldContext<(string | number)[]>()
  const schema = getFieldSchema(field, ["array"])
  const items = getSelectionItems(schema)
  return (
    <CheckboxGroupField
      label={schema.title}
      description={schema.description}
      {...props}
    >
      {items.map((item) => (
        <Checkbox key={item.id} value={item.id.toString()}>
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroupField>
  )
}
