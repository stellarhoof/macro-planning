import { ark } from "@ark-ui/react/factory"

import { styled } from "#src/panda-gen/jsx"
import { input } from "#src/panda-gen/recipes"
import type { ComponentProps } from "#src/panda-gen/types"

export type InputProps = ComponentProps<typeof Input>

export const Input = styled(ark.input, input)
