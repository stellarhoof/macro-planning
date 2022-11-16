import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import {
  Button,
  Heading,
  FormControl,
  FormHelperText,
  Flex,
} from "@chakra-ui/react"
import { FieldErrors } from "../FieldErrors.jsx"

export const DefaultFormLayout = observer(
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
      {field.schema.title && <Heading>{field.schema.title}</Heading>}
      {field.schema.description && (
        <FormHelperText>{field.schema.description}</FormHelperText>
      )}
      {children}
      <Flex sx={{ gap: 8, justifyContent: "end" }}>
        <Button
          type="submit"
          isLoading={field.isSubmitting}
          loadingText="Saving..."
        >
          Save
        </Button>
      </Flex>
      <FieldErrors field={field} />
    </FormControl>
  ))
)
