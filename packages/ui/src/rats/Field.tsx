import {
  type FieldErrorProps,
  Group,
  type GroupProps,
  type LabelProps,
  FieldError as RACFieldError,
  Label as RACLabel,
  Text,
  type TextProps,
  composeRenderProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

import { composeTailwindRenderProps, focusRing } from "./utils.ts"

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-gray-500 dark:text-zinc-400",
        props.className,
      )}
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-gray-600", props.className)}
    />
  )
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600 forced-colors:text-[Mark]",
      )}
    />
  )
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false:
        "border-gray-300 dark:border-zinc-500 forced-colors:border-[ButtonBorder]",
      true: "border-gray-600 dark:border-zinc-300 forced-colors:border-[Highlight]",
    },
    isInvalid: {
      true: "border-red-600 dark:border-red-600 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
})

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 bg-white dark:bg-zinc-900 forced-colors:bg-[Field] border-2 rounded-lg overflow-hidden",
  variants: fieldBorderStyles.variants,
})

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  )
}
