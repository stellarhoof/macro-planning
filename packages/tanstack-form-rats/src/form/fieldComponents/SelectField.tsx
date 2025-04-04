import { Select, type SelectProps } from "#ui-rats/rats/pickers/Select.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface SelectFieldProps<T extends object>
  extends Omit<
    SelectProps<T>,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultSelectedKey"
    // Managed by Tanstack form.
    | "selectedKey"
    | "onSelectionChange"
  > {}

export function SelectField<T extends object>(props: SelectFieldProps<T>) {
  const field = useFieldContext<string | number | null>()
  return (
    <Select
      {...props}
      {...commonFieldProps(field)}
      selectedKey={field.state.value}
      onSelectionChange={field.handleChange}
    />
  )
}
