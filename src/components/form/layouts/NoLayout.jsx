import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { FormControl } from "@chakra-ui/react"

export const NoLayout = observer(
  forwardRef(({ field, ...props }, ref) => (
    <FormControl
      ref={ref}
      hidden={field.hidden}
      isRequired={field.required}
      isDisabled={field.disabled}
      isReadOnly={field.readonly}
      isInvalid={field.validationMessage}
      {...props}
    />
  ))
)
