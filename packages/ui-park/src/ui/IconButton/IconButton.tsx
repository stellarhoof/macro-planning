import { ark } from "@ark-ui/react/factory"

import { styled } from "#src/panda-gen/jsx"
import { type ButtonVariantProps, button } from "#src/panda-gen/recipes"
import type { ComponentProps } from "#src/panda-gen/types"

export type IconButtonProps = ComponentProps<typeof IconButton>

export const IconButton = styled(ark.button, button, {
  defaultProps: { px: "0" } as ButtonVariantProps,
})
