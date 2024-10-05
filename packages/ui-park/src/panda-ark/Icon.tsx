import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { icon } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type IconProps = ComponentProps<typeof Icon>
export const Icon = styled(ark.svg, icon, {
  defaultProps: { asChild: true },
})
