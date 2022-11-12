import _ from "lodash/fp.js"
import { observer } from "mobx-react-lite"
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  FormErrorIcon,
  Icon,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react"
import { MdAdd, MdRemove } from "react-icons/md"

const Errors = ({ errors }) =>
  _.map(
    (error) => (
      <FormErrorMessage key={error.schemaPath}>
        <FormErrorIcon />
        {_.upperFirst(error.message)}
      </FormErrorMessage>
    ),
    errors
  )

const FieldActions = observer(
  ({ field, parent }) =>
    (field.addField || parent?.removeField) && (
      <ButtonGroup isAttached aria-label="Actions" size="xs">
        {field.canAddField && (
          <IconButton
            aria-label="Add"
            icon={<Icon as={MdAdd} boxSize="1.2em" />}
            onClick={() => field.addField()}
          />
        )}
        {parent?.canRemoveField && (
          <IconButton
            aria-label="Remove"
            colorScheme="red"
            icon={<Icon as={MdRemove} boxSize="1.2em" />}
            onClick={() => parent.removeField(field.key)}
          />
        )}
      </ButtonGroup>
    )
)

export const Field = observer(({ isCollection, field, parent, children }) => (
  <FormControl
    as={isCollection && "fieldset"}
    hidden={field.hidden}
    isDisabled={field.disabled}
    isRequired={field.required}
    isInvalid={!_.isEmpty(field.errors)}
  >
    {!field.disabled && <FieldActions field={field} parent={parent} />}
    {field.schema.title && (
      <FormLabel as={isCollection && "legend"}>{field.schema.title}</FormLabel>
    )}
    {children}
    {field.schema.description && (
      <FormHelperText>{field.schema.description}</FormHelperText>
    )}
    {!field.disabled && <Errors errors={field.errors} />}
  </FormControl>
))
