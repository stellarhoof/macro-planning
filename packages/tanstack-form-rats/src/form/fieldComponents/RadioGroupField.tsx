import {
  RadioGroup,
  type RadioGroupProps,
} from "#ui-rats/rats/forms/RadioGroup.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface RadioGroupFieldProps
  extends Omit<
    RadioGroupProps,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
  > {}

export function RadioGroupField(props: RadioGroupFieldProps) {
  const field = useFieldContext<string>()
  return (
    <RadioGroup
      {...props}
      {...commonFieldProps(field)}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
