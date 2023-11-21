import { Stack } from "#styled-system/jsx"

export function Help() {
  return (
    <Stack>
      <a href="https://fdc.nal.usda.gov/fdc-app.html#/" target="_blank">
        FDC Food Data
      </a>
      <a href="https://tools.myfooddata.com/nutrition-facts" target="_blank">
        My Food Data
      </a>
      <a
        href="https://www.eatthismuch.com/food/browse/?q=&type=food&nutrition_display="
        target="_blank"
      >
        Eat This Much Food Browser
      </a>
    </Stack>
  )
}
