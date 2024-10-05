"use client"
import type { Assign, PolymorphicProps } from "@ark-ui/react"
import { ark } from "@ark-ui/react/factory"
import { alert } from "#src/panda-styles/recipes"
import type { ComponentProps, HTMLStyledProps } from "#src/panda-styles/types"
import { createStyleContext } from "./utils/create-style-context.tsx"

const { withProvider, withContext } = createStyleContext(alert)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, PolymorphicProps>
>(ark.div, "root")

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, PolymorphicProps>
>(ark.div, "content")

export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<"div">, PolymorphicProps>
>(ark.div, "description")

export const Icon = withContext<
  HTMLOrSVGElement,
  Assign<HTMLStyledProps<"svg">, PolymorphicProps>
>(ark.svg, "icon")

export const Title = withContext<
  HTMLHeadingElement,
  Assign<HTMLStyledProps<"h5">, PolymorphicProps>
>(ark.h5, "title")
