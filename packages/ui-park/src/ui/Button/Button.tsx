import { ark } from "@ark-ui/react/factory"

import { styled } from "#src/panda-gen/jsx"
import { button } from "#src/panda-gen/recipes"
import type { ComponentProps } from "#src/panda-gen/types"

export type ButtonProps = ComponentProps<typeof Button>

export const Button = styled(ark.button, button)
