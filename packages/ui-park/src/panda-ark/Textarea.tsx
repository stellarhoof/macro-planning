import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { textarea } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type TextareaProps = ComponentProps<typeof Textarea>
export const Textarea = styled(ark.textarea, textarea)
