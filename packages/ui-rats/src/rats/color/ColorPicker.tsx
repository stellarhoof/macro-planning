import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  Button,
  DialogTrigger,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Dialog } from "../overlays/Dialog.tsx"
import { Popover } from "../overlays/Popover.tsx"
import { focusRing } from "../utils.ts"
import { ColorArea } from "./ColorArea.tsx"
import { ColorField } from "./ColorField.tsx"
import { ColorSlider } from "./ColorSlider.tsx"
import { ColorSwatch } from "./ColorSwatch.tsx"

const buttonStyles = tv({
  extend: focusRing,
  base: "flex gap-2 items-center cursor-default rounded text-sm text-gray-800 dark:text-gray-200",
})

export interface ColorPickerProps extends AriaColorPickerProps {
  label?: string
  children?: React.ReactNode
}

export function ColorPicker({ label, children, ...props }: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <Button className={buttonStyles}>
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-2">
            {children || (
              <>
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                />
                <ColorSlider colorSpace="hsb" channel="hue" />
                <ColorField label="Hex" />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  )
}
