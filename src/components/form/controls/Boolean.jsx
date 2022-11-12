import { forwardRef } from "react"
import { Checkbox, FormLabel } from "@chakra-ui/react"

const value = true

export const Boolean = forwardRef(({ field, ...props }, ref) => (
  <Checkbox
    ref={ref}
    as={FormLabel}
    value={value}
    defaultChecked={!!field.value}
    fontWeight="normal"
    onChange={(e) => (field.value = e.target.checked ? value : undefined)}
    {...props}
  >
    {field.schema.title}
  </Checkbox>
))
