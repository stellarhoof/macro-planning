import { type Preset, definePreset } from "@pandacss/dev"
import { conditions } from "./conditions.ts"
import { globalCss } from "./global-css.ts"
import { breakpoints } from "./theme/breakpoints.ts"
import { keyframes } from "./theme/keyframes.ts"
import { recipes, slotRecipes } from "./theme/recipes/index.ts"
import { createSemanticTokens } from "./theme/semantic-tokens/index.ts"
import { textStyles } from "./theme/text-styles.ts"
import { createTokens } from "./theme/tokens/index.ts"
import type { PresetOptions } from "./types.ts"

export type { PresetOptions }

const defaultOptions: PresetOptions = {
  accentColor: "neutral",
  additionalColors: [],
  borderRadius: "sm",
  grayColor: "neutral",
}

export const createPreset = (
  options: PresetOptions = defaultOptions,
): Preset => {
  const semanticTokens = createSemanticTokens(options)
  const tokens = createTokens(options)

  return definePreset({
    name: "panda-preset",
    theme: {
      extend: {
        breakpoints,
        keyframes,
        recipes,
        semanticTokens,
        slotRecipes,
        textStyles,
        tokens,
      },
    },
    conditions,
    globalCss,
  })
}

export const preset = createPreset()
