import { Checkbox, type CheckboxProps } from "#ui-rats/rats/forms/Checkbox.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface CheckboxFieldProps
  extends Omit<
    CheckboxProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultSelected"
    // Managed by Tanstack form.
    | "isSelected"
    | "onChange"
  > {}

export function CheckboxField(props: CheckboxFieldProps) {
  const field = useFieldContext<boolean>()
  return (
    <Checkbox
      {...props}
      {...commonFieldProps(field)}
      isSelected={field.state.value}
      onChange={field.handleChange}
    />
  )
}
