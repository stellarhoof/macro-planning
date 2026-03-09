import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { composeTailwindRenderProps, focusRing } from "../utils.ts"
import { ColorSwatch } from "./ColorSwatch.tsx"

export function ColorSwatchPicker({ children, ...props }: Omit<ColorSwatchPickerProps, "layout">) {
  return (
    <AriaColorSwatchPicker
      {...props}
      className={composeTailwindRenderProps(props.className, "flex gap-1")}
    >
      {children}
    </AriaColorSwatchPicker>
  )
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative rounded",
})

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props} className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 h-full w-full rounded border border-2 border-black outline outline-2 -outline-offset-4 outline-white forced-color-adjust-none dark:border-white dark:outline-black" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  )
}
