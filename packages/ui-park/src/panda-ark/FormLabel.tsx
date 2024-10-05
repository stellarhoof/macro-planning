import { ark } from '@ark-ui/react/factory'
import { styled } from '#src/panda-styles/jsx'
import { formLabel } from '#src/panda-styles/recipes'
import type { ComponentProps } from '#src/panda-styles/types'

export type FormLabelProps = ComponentProps<typeof FormLabel>
export const FormLabel = styled(ark.label, formLabel)
