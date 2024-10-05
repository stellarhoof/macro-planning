import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import ariaComponents from "tailwindcss-react-aria-components"

export default {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [
    // https://react-spectrum.adobe.com/react-aria/styling.html#plugin
    ariaComponents,
    // https://github.com/jamiebuilds/tailwindcss-animate
    animate,
  ],
} satisfies Config
