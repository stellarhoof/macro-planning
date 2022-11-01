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

const ArrayActions = ({ field }) => {
  const isArray = field.schema.type === "array"
  const isArrayItem = !_.isNaN(parseInt(_.last(field.path.split("."))))
  return (
    (isArray || isArrayItem) && (
      <ButtonGroup isAttached aria-label="Actions" size="xs">
        {isArray && (
          <IconButton
            aria-label="Add"
            icon={<Icon as={MdAdd} boxSize="1.2em" />}
          />
        )}
        {isArrayItem && (
          <IconButton
            aria-label="Remove"
            colorScheme="red"
            icon={<Icon as={MdRemove} boxSize="1.2em" />}
          />
        )}
      </ButtonGroup>
    )
  )
}

export const Field = observer(({ field, children }) => {
  const isCollection =
    field.schema.type === "object" || field.schema.type === "array"
  return (
    <FormControl
      as={isCollection && "fieldset"}
      isDisabled={field.disabled}
      isRequired={field.required}
      isInvalid={!_.isEmpty(field.errors)}
      sx={{
        display: field.hidden && "none",
        ...(isCollection && {
          p: 3,
          borderRadius: "base",
          borderWidth: "1px",
          borderColor: "gray.300",
          "> [aria-label=Actions]": {
            pos: "absolute",
            top: -3,
            right: 0,
            zIndex: 2,
          },
        }),
      }}
    >
      {!field.disabled && <ArrayActions field={field} />}
      {field.schema.title && (
        <FormLabel as={isCollection && "legend"}>
          {field.schema.title}
        </FormLabel>
      )}
      {children}
      {field.schema.description && (
        <FormHelperText>{field.schema.description}</FormHelperText>
      )}
      <Errors errors={field.errors} />
    </FormControl>
  )
})
