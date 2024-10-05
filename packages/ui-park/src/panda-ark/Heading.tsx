import { styled } from '#src/panda-styles/jsx'
import { type TextVariantProps, text } from '#src/panda-styles/recipes'
import type { ComponentProps, StyledComponent } from '#src/panda-styles/types'

type TextProps = TextVariantProps & { as?: React.ElementType }

export type HeadingProps = ComponentProps<typeof Heading>
export const Heading = styled('h2', text, {
  defaultProps: { variant: 'heading' },
}) as StyledComponent<'h2', TextProps>
