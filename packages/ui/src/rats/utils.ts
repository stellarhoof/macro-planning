import { composeRenderProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

export const focusRing = tv({
  base: "outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
})

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className))
}

type ClassName<T> =
  | string
  | ((values: T & { defaultClassName: string | undefined }) => string)
  | undefined

export function mergeClassNames<T>(left: ClassName<T>, right: ClassName<T>) {
  if (typeof right === "function" || typeof left === "function") {
    return ((values) => {
      return twMerge(
        typeof left === "function" ? left(values) : left,
        typeof right === "function" ? right(values) : right,
      )
    }) as Exclude<ClassName<T>, string>
  }
  return twMerge(left, right)
}
