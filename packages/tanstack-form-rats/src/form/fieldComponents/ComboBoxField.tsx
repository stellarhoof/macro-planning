import {
  ComboBox,
  type ComboBoxProps,
} from "#ui-rats/rats/pickers/ComboBox.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface ComboBoxFieldProps<T extends object>
  extends Omit<
    ComboBoxProps<T>,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultItems"
    | "defaultSelectedKey"
    // Managed by Tanstack form.
    | "selectedKey"
    | "onSelectionChange"
  > {}

export function ComboBoxField<T extends object>(props: ComboBoxFieldProps<T>) {
  const field = useFieldContext<string | number | null>()
  return (
    <ComboBox
      {...props}
      {...commonFieldProps(field)}
      selectedKey={field.state.value}
      onSelectionChange={field.handleChange}
    />
  )
}
