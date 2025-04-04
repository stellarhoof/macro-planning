import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from "#ui-rats/rats/forms/NumberField.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface NumberFieldProps
  extends Omit<
    AriaNumberFieldProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
  > {}

export function NumberField(props: NumberFieldProps) {
  const field = useFieldContext<number>()
  return (
    <AriaNumberField
      {...props}
      {...commonFieldProps(field)}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
