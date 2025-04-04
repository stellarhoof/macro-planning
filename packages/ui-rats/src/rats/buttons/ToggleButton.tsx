import {
  composeRenderProps,
  ToggleButton as RACToggleButton,
  type ToggleButtonProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { focusRing } from "../utils.ts"

const styles = tv({
  extend: focusRing,
  base: "px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] cursor-default",
  variants: {
    isSelected: {
      false: "bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800",
      true: "bg-gray-700 hover:bg-gray-800 pressed:bg-gray-900 text-white",
    },
    isDisabled: {
      true: "bg-gray-100",
    },
  },
})

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    />
  )
}
