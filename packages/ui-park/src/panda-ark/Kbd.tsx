import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { kbd } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type KbdProps = ComponentProps<typeof Kbd>
export const Kbd = styled(ark.kbd, kbd)
