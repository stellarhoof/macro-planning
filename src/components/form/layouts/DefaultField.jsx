import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react"
import { FieldErrors } from "./FieldErrors.jsx"
import { FieldActions } from "./FieldActions.jsx"

export const DefaultField = observer(
  forwardRef(({ field, children, ...props }, ref) => (
    <FormControl
      ref={ref}
      hidden={field.hidden}
      isRequired={field.required}
      isDisabled={field.disabled}
      isReadOnly={field.readonly}
      isInvalid={field.validationMessage}
      {...props}
    >
      {!field.disabled && <FieldActions field={field} />}
      {field.schema.title && (
        <FormLabel as={props.as === "fieldset" && "legend"}>
          {field.schema.title}
        </FormLabel>
      )}
      {children}
      {field.schema.description && (
        <FormHelperText>{field.schema.description}</FormHelperText>
      )}
      <FieldErrors field={field} />
    </FormControl>
  ))
)
