import { ChevronDown } from "lucide-react"
import type { ForwardedRef } from "react"
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ListBox,
  type ValidationResult,
} from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { Description, FieldError, FieldGroup, Label } from "../Field.tsx"
import { Input } from "../Field.tsx"
import { Popover } from "../overlays/Popover.tsx"
import { composeTailwindRenderProps } from "../utils.ts"

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  ref?: ForwardedRef<HTMLInputElement>
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ref,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1",
      )}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <Input ref={ref} />
        <Button variant="icon" className="mr-1 rounded">
          <ChevronDown aria-hidden className="h-4 w-4" />
        </Button>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  )
}
