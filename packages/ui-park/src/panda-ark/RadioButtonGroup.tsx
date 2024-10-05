"use client"
import type { Assign } from "@ark-ui/react"
import { RadioGroup } from "@ark-ui/react/radio-group"
import {
  type RadioButtonGroupVariantProps,
  radioButtonGroup,
} from "#src/panda-styles/recipes"
import type { HTMLStyledProps } from "#src/panda-styles/types"
import { createStyleContext } from "./utils/create-style-context.tsx"

const { withProvider, withContext } = createStyleContext(radioButtonGroup)

export interface RootProps
  extends Assign<HTMLStyledProps<"div">, RadioGroup.RootProps>,
    RadioButtonGroupVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(
  RadioGroup.Root,
  "root",
)

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, RadioGroup.IndicatorProps>
>(RadioGroup.Indicator, "indicator")

export const ItemControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, RadioGroup.ItemControlProps>
>(RadioGroup.ItemControl, "itemControl")

export const Item = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<"label">, RadioGroup.ItemProps>
>(RadioGroup.Item, "item")

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<"span">, RadioGroup.ItemTextProps>
>(RadioGroup.ItemText, "itemText")

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<"label">, RadioGroup.LabelProps>
>(RadioGroup.Label, "label")

export {
  RadioGroupContext as Context,
  RadioGroupItemHiddenInput as ItemHiddenInput,
} from "@ark-ui/react/radio-group"
