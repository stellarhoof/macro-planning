import { Radio } from "#ui-rats/rats/forms/RadioGroup.tsx"

import { useFieldContext } from "../contexts.ts"
import {
  RadioGroupField,
  type RadioGroupFieldProps,
} from "../fieldComponents/RadioGroupField.tsx"
import { getFieldSchema, getSelectionItems } from "../util.ts"

export function JsonSchemaRadioGroupField(props: RadioGroupFieldProps) {
  const field = useFieldContext<string | number>()
  const schema = getFieldSchema(field, ["string", "number"])
  const items = getSelectionItems(schema)
  return (
    <RadioGroupField
      label={schema.title}
      description={schema.description}
      {...props}
    >
      {items.map((item) => (
        <Radio key={item.id} value={item.id.toString()}>
          {item.label}
        </Radio>
      ))}
    </RadioGroupField>
  )
}
