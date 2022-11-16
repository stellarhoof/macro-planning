import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import {
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react"
import { AddField, RemoveField, MoveField } from "../FieldActions.jsx"
import { FieldErrors } from "../FieldErrors.jsx"

const showFieldActions = (field) =>
  !field.disabled &&
  (field.schema.type === "array" || field.schema.type === "object") &&
  (field.addField || field.parent?.removeField || field.parent?.moveField)

const FieldActions = ({ field }) => (
  <ButtonGroup isAttached aria-label="Actions" size="xs">
    <AddField field={field} />
    <RemoveField field={field} />
    <MoveField field={field} />
  </ButtonGroup>
)

export const DefaultFieldLayout = observer(
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
      {showFieldActions(field) && <FieldActions field={field} />}
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
