import { styled } from '#src/panda-styles/jsx'
import { type TextVariantProps, text } from '#src/panda-styles/recipes'
import type { ComponentProps, StyledComponent } from '#src/panda-styles/types'

type ParagraphProps = TextVariantProps & { as?: React.ElementType }

export type TextProps = ComponentProps<typeof Text>
export const Text = styled('p', text) as StyledComponent<'p', ParagraphProps>
