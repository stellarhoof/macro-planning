import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { type ButtonVariantProps, button } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type IconButtonProps = ComponentProps<typeof IconButton>
export const IconButton = styled(ark.button, button, {
  defaultProps: { px: '0' } as ButtonVariantProps,
})
