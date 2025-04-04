import {
  CheckboxGroup,
  type CheckboxGroupProps,
} from "#ui-rats/rats/forms/CheckboxGroup.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface CheckboxGroupFieldProps
  extends Omit<
    CheckboxGroupProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
  > {}

export function CheckboxGroupField(props: CheckboxGroupFieldProps) {
  const field = useFieldContext<string[]>()
  return (
    <CheckboxGroup
      {...props}
      {...commonFieldProps(field)}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
