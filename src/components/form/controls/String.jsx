import { forwardRef } from "react"
import { Input } from "@chakra-ui/react"

export const String = forwardRef(({ field, ...props }, ref) => (
  <Input
    ref={ref}
    defaultValue={field.value}
    onChange={(e) => (field.value = e.target.value)}
    {...props}
  />
))
