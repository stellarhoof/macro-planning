import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { type ForwardedRef, forwardRef } from "react"
import {
  Description,
  FieldError,
  Input,
  Label,
  TextArea,
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

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export const TextField = forwardRef(
  (
    { label, description, errorMessage, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <AriaTextField
        {...props}
        className={composeTailwindRenderProps(
          props.className,
          "flex flex-col gap-1",
        )}
      >
        {label && <Label>{label}</Label>}
        <Input ref={ref} className={inputStyles} />
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </AriaTextField>
    )
  },
)

export const TextAreaField = forwardRef(
  (
    { label, description, errorMessage, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <AriaTextField
        {...props}
        className={composeTailwindRenderProps(
          props.className,
          "flex flex-col gap-1",
        )}
      >
        {label && <Label>{label}</Label>}
        <TextArea ref={ref} className={inputStyles} />
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </AriaTextField>
    )
  },
)
