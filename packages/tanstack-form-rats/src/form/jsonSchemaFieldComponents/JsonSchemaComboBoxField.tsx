import { ListBoxItem } from "#ui-rats/rats/collections/ListBox.tsx"

import { useFieldContext } from "../contexts.ts"
import {
  ComboBoxField,
  type ComboBoxFieldProps,
} from "../fieldComponents/ComboBoxField.tsx"
import {
  getFieldSchema,
  getSelectionItems,
  type SelectionItem,
} from "../util.ts"

export function JsonSchemaComboBoxField(
  props: Omit<ComboBoxFieldProps<SelectionItem>, "children">,
) {
  const field = useFieldContext<string | number>()
  const schema = getFieldSchema(field, ["string", "number"])
  const items = getSelectionItems(schema)
  return (
    <ComboBoxField
      items={items}
      label={schema.title}
      description={schema.description}
      {...props}
    >
      {(item) => <ListBoxItem id={item.id}>{item.label}</ListBoxItem>}
    </ComboBoxField>
  )
}
