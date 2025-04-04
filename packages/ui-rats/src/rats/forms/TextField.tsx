import type { ForwardedRef } from "react"
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

import { Description, FieldError, Input, Label, TextArea } from "../Field.tsx"

export interface TextFieldProps extends Omit<AriaTextFieldProps, "className"> {
  ref?: ForwardedRef<HTMLInputElement>
  className?: string
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function TextField({
  label,
  description,
  errorMessage,
  ref,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={twMerge("flex flex-col gap-1", props.className)}
    >
      {label && <Label>{label}</Label>}
      <Input ref={ref} className="border-2 rounded-md" />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export interface TextAreaProps extends Omit<AriaTextFieldProps, "className"> {
  ref?: ForwardedRef<HTMLTextAreaElement>
  className?: string
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function TextAreaField({
  label,
  description,
  errorMessage,
  ref,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      className={twMerge("flex flex-col gap-1", props.className)}
    >
      {label && <Label>{label}</Label>}
      <TextArea ref={ref} className="border-2 rounded-md" />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
