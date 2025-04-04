import {
  TextAreaField as AriaTextAreaField,
  type TextAreaProps as AriaTextAreaProps,
} from "#ui-rats/rats/forms/TextField.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface TextAreaFieldProps
  extends Omit<
    AriaTextAreaProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
  > {}

export function TextAreaField(props: TextAreaFieldProps) {
  const field = useFieldContext<string>()
  return (
    <AriaTextAreaField
      {...props}
      {...commonFieldProps(field)}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
