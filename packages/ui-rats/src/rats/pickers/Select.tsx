import { ChevronDown } from "lucide-react"
import type { ForwardedRef } from "react"
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  Button,
  ListBox,
  SelectValue,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { DropdownItem, DropdownSection } from "../collections/ListBox.tsx"
import { Description, FieldError, Label } from "../Field.tsx"
import { Popover } from "../overlays/Popover.tsx"
import { composeTailwindRenderProps, focusRing } from "../utils.ts"

export const SelectItem = DropdownItem

export const SelectSection = DropdownSection

const styles = tv({
  extend: focusRing,
  base: "flex items-center text-start gap-4 w-full cursor-default border-2 border-gray-300 dark:border-zinc-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none rounded-lg pl-3 pr-2 py-1.5 min-w-[150px] transition bg-white dark:bg-zinc-700",
  variants: {
    isDisabled: {
      false:
        "text-gray-800 dark:text-zinc-300 hover:bg-gray-100 pressed:bg-gray-200 dark:hover:bg-zinc-600 dark:pressed:bg-zinc-500 group-invalid:border-red-600 forced-colors:group-invalid:border-[Mark]",
      true: "text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText] dark:bg-zinc-800 dark:border-white/5 forced-colors:border-[GrayText]",
    },
  },
})

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  ref?: ForwardedRef<HTMLDivElement>
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ref,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      ref={ref}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="flex-1 text-sm placeholder-shown:italic" />
        <ChevronDown
          aria-hidden
          className="w-4 h-4 text-gray-600 dark:text-zinc-400 forced-colors:text-[ButtonText] group-disabled:text-gray-200 dark:group-disabled:text-zinc-600 forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}
