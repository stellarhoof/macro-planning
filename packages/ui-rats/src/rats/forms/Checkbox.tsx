import { Check, Minus } from "lucide-react"
import { type ForwardedRef, type ReactNode } from "react"
import { useField } from "react-aria"
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
  composeRenderProps,
  Text,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Description, Label } from "../Field.tsx"
import { focusRing } from "../utils.ts"

const checkboxStyles = tv({
  base: "flex flex-col gap-2 group text-sm transition",
  variants: {
    isDisabled: {
      false: "text-gray-800",
      true: "text-gray-300",
    },
  },
})

const boxStyles = tv({
  extend: focusRing,
  base: "w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border-2 transition",
  variants: {
    isSelected: {
      false:
        "bg-white border-[--color] [--color:theme(colors.gray.400)] group-pressed:[--color:theme(colors.gray.500)]",
      true: "bg-[--color] border-[--color] [--color:theme(colors.gray.700)] group-pressed:[--color:theme(colors.gray.800)]",
    },
    isInvalid: {
      true: "[--color:theme(colors.red.700)]",
    },
    isDisabled: {
      true: "[--color:theme(colors.gray.200)]",
    },
  },
})

export interface CheckboxProps extends Omit<AriaCheckboxProps, "children"> {
  ref?: ForwardedRef<HTMLLabelElement>
  children?: ReactNode
  description?: string
  errorMessage?: string
}

export function Checkbox(props: CheckboxProps) {
  const field = useField({ ...props, label: props.children })
  return (
    <AriaCheckbox
      {...props}
      {...field.fieldProps}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {(state) => {
        return (
          <>
            <div className="flex gap-1">
              <span
                className={boxStyles({
                  ...state,
                  isSelected: state.isSelected || state.isIndeterminate,
                })}
              >
                {state.isIndeterminate && (
                  <Minus
                    aria-hidden
                    className="w-4 h-4 text-white group-disabled:text-gray-400"
                  />
                )}
                {state.isSelected && (
                  <Check
                    aria-hidden
                    className="w-4 h-4 text-white group-disabled:text-gray-400"
                  />
                )}
              </span>
              <Label {...field.labelProps}>{props.children}</Label>
            </div>
            {props.description && (
              <Description {...field.descriptionProps}>
                {props.description}
              </Description>
            )}
            {props.errorMessage && (
              <Text
                slot="errorMessage"
                className="text-sm text-red-600"
                {...field.errorMessageProps}
              >
                {props.errorMessage}
              </Text>
            )}
          </>
        )
      }}
    </AriaCheckbox>
  )
}
