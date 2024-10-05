import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { link } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type LinkProps = ComponentProps<typeof Link>
export const Link = styled(ark.a, link)
