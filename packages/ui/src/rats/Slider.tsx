import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Label } from "./Field.jsx"
import { composeTailwindRenderProps, focusRing } from "./utils.js"

const trackStyles = tv({
  base: "rounded-full",
  variants: {
    orientation: {
      horizontal: "w-full h-[6px]",
      vertical: "h-full w-[6px] ml-[50%] -translate-x-[50%]",
    },
    isDisabled: {
      false: "bg-gray-300 dark:bg-zinc-500 forced-colors:bg-[ButtonBorder]",
      true: "bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText]",
    },
  },
})

const thumbStyles = tv({
  extend: focusRing,
  base: "w-6 h-6 group-orientation-horizontal:mt-6 group-orientation-vertical:ml-3 rounded-full bg-gray-50 dark:bg-zinc-900 border-2 border-gray-700 dark:border-gray-300",
  variants: {
    isDragging: {
      true: "bg-gray-700 dark:bg-gray-300 forced-colors:bg-[ButtonBorder]",
    },
    isDisabled: {
      true: "border-gray-300 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
})

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "orientation-horizontal:grid orientation-horizontal:w-64 orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2",
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-sm font-medium text-gray-500 dark:text-zinc-400">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack className="orientation-horizontal:h-6 orientation-vertical:h-64 orientation-vertical:w-6 group col-span-2 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.map((_, i) => (
              <SliderThumb
                // biome-ignore lint/suspicious/noArrayIndexKey:
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}
