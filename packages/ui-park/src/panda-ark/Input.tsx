import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { input } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type InputProps = ComponentProps<typeof Input>
export const Input = styled(ark.input, input)
