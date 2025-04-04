import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "#ui-rats/rats/forms/TextField.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface TextFieldProps
  extends Omit<
    AriaTextFieldProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
  > {}

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>()
  return (
    <AriaTextField
      {...props}
      {...commonFieldProps(field)}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
