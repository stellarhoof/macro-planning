import { ChevronDown, ChevronUp } from "lucide-react"
import { type ForwardedRef } from "react"
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  type ValidationResult,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

import { Description, FieldError, FieldGroup, Input, Label } from "../Field.tsx"

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="pressed:bg-gray-100 cursor-default px-0.5 text-gray-500 group-disabled:text-gray-200"
    />
  )
}

export interface NumberFieldProps extends AriaNumberFieldProps {
  ref?: ForwardedRef<HTMLInputElement>
  className?: string
  // Common
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function NumberField({
  ref,
  label,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={twMerge("group flex flex-col gap-1", props.className)}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <Input ref={ref} />
        <div className="flex flex-col border-s-2">
          <StepperButton slot="increment">
            <ChevronUp aria-hidden className="h-4 w-4" />
          </StepperButton>
          <div className="border-b-2" />
          <StepperButton slot="decrement">
            <ChevronDown aria-hidden className="h-4 w-4" />
          </StepperButton>
        </div>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaNumberField>
  )
}
