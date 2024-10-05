import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { spinner } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type SpinnerProps = ComponentProps<typeof Spinner>
export const Spinner = styled(ark.div, spinner)
