import { ListBoxItem } from "#ui-rats/rats/collections/ListBox.tsx"

import { useFieldContext } from "../contexts.ts"
import {
  SelectField,
  type SelectFieldProps,
} from "../fieldComponents/SelectField.tsx"
import {
  getFieldSchema,
  getSelectionItems,
  type SelectionItem,
} from "../util.ts"

export function JsonSchemaSelectField(
  props: Omit<SelectFieldProps<SelectionItem>, "children">,
) {
  const field = useFieldContext<string | number>()
  const schema = getFieldSchema(field, ["string", "number"])
  const items = getSelectionItems(schema)
  return (
    <SelectField
      items={items}
      label={schema.title}
      description={schema.description}
      {...props}
    >
      {(item) => <ListBoxItem id={item.id}>{item.label}</ListBoxItem>}
    </SelectField>
  )
}
