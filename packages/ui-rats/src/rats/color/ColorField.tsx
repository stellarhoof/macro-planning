import {
  ColorField as AriaColorField,
  type ColorFieldProps as AriaColorFieldProps,
  type ValidationResult,
} from "react-aria-components"

import { Description, FieldError, Input, Label } from "../Field.tsx"
import { composeTailwindRenderProps } from "../utils.ts"

export interface ColorFieldProps extends AriaColorFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function ColorField({
  label,
  description,
  errorMessage,
  ...props
}: ColorFieldProps) {
  return (
    <AriaColorField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <Input />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaColorField>
  )
}
