import {
  ColorField as AriaColorField,
  type ColorFieldProps as AriaColorFieldProps,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
} from "../Field.tsx"
import { composeTailwindRenderProps, focusRing } from "../utils.ts"

const inputStyles = tv({
  extend: focusRing,
  base: "border-2 rounded-md",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
})

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
      <Input className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaColorField>
  )
}
