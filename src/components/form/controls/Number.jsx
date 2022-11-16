import _ from "lodash/fp"
import { forwardRef } from "react"
import { NumberInput, NumberInputField } from "@chakra-ui/react"

export const Number = forwardRef(({ field, ...props }, ref) => (
  <NumberInput
    ref={ref}
    defaultValue={field.value}
    onChange={(x) => (field.value = _.toNumber(x))}
    {...props}
  >
    <NumberInputField />
  </NumberInput>
))
