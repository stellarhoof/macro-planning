import { ChevronDown } from "lucide-react"
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ListBox,
  type ValidationResult,
} from "react-aria-components"

import { type ForwardedRef, forwardRef } from "react"
import { Description, FieldError, FieldGroup, Label } from "../Field.tsx"
import { Input } from "../Field.tsx"
import { Button } from "../buttons/Button.tsx"
import { DropdownItem, DropdownSection } from "../collections/ListBox.tsx"
import { Popover } from "../overlays/Popover.tsx"
import { composeTailwindRenderProps } from "../utils.ts"

export const ComboBoxItem = DropdownItem

export const ComboBoxSection = DropdownSection

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  label?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export const ComboBox = forwardRef(
  (
    {
      label,
      description,
      errorMessage,
      children,
      items,
      ...props
    }: // This will get better once React 19 comes out and we don't need
    // forwardRef anymore.
    // biome-ignore lint/suspicious/noExplicitAny:
    ComboBoxProps<any>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
  },
)
