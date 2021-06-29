import React from 'react'
import { Stack, Link } from '@chakra-ui/react'

export default () => (
  <Stack>
    <Link href="https://fdc.nal.usda.gov/fdc-app.html#/" isExternal>
      FDC Food Data
    </Link>
    <Link href="https://tools.myfooddata.com/nutrition-facts" isExternal>
      My Food Data
    </Link>
    <Link
      href="https://www.eatthismuch.com/food/browse/?q=&type=food&nutrition_display="
      isExternal
    >
      Eat This Much Food Browser
    </Link>
  </Stack>
)
