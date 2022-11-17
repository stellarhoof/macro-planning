import _ from "lodash/fp.js"
import { forwardRef, useEffect } from "react"
import { when, autorun, reaction } from "mobx"
import { observer } from "mobx-react-lite"
import {
  Grid,
  Icon,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormErrorIcon,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react"
import { MdAdd, MdRemove, MdDragIndicator } from "react-icons/md"

export const FieldControl = observer(
  forwardRef(({ field, ...props }, ref) => {
    if (_.isFunction(field.schema.effect)) {
      useEffect(() => {
        const disposers = []
        field.schema.effect(field, {
          when: (...args) => disposers.push(when(...args)),
          autorun: (...args) => disposers.push(autorun(...args)),
          reaction: (...args) => disposers.push(reaction(...args)),
        })
        return _.over(disposers)
      }, [])
    }
    return (
      <FormControl
        ref={ref}
        hidden={field.hidden}
        isRequired={field.required}
        isDisabled={field.disabled}
        isReadOnly={field.readonly}
        isInvalid={field.validationMessage}
        {...props}
      />
    )
  })
)

export const FieldLabel = ({ field, children, ...props }) =>
  field.schema.title && <FormLabel {...props}>{field.schema.title}</FormLabel>

export const FieldDescription = ({ field, ...props }) =>
  field.schema.description && (
    <FormHelperText {...props}>{field.schema.description}</FormHelperText>
  )

export const FieldErrors = observer(({ field }) =>
  field.validationMessage?.split("\n").map((message) => (
    <FormErrorMessage key={message}>
      <FormErrorIcon />
      {_.upperFirst(message)}
    </FormErrorMessage>
  ))
)

export const FieldsGrid = observer(
  forwardRef(({ field, ...props }, ref) => (
    <Grid ref={ref} {...props}>
      {_.map(
        (field) => (
          <field.schema.control.component
            key={field.id}
            field={field}
            onChange={field.reportValidity}
            {...field.schema.control.props}
          />
        ),
        field.fields
      )}
    </Grid>
  ))
)

export const AddField = observer(
  ({ field, ...props }) =>
    !field.disabled &&
    field.addField &&
    field.canAddField && (
      <IconButton
        size="xs"
        aria-label="Add Field"
        icon={<Icon as={MdAdd} boxSize="1.2em" />}
        onClick={() => field.addField()}
        {...props}
      />
    )
)

export const RemoveField = observer(
  ({ field, ...props }) =>
    !field.disabled &&
    field.parent?.removeField &&
    field.parent?.canRemoveField && (
      <IconButton
        size="xs"
        aria-label="Remove Field"
        icon={<Icon as={MdRemove} boxSize="1.2em" />}
        onClick={() => field.parent.removeField(field.name)}
        {...props}
      />
    )
)

export const MoveField = observer(
  ({ field, ...props }) =>
    !field.disabled &&
    field.parent?.moveField && (
      <IconButton
        size="xs"
        aria-label="Move Field"
        icon={<Icon as={MdDragIndicator} boxSize="1.2em" />}
        onClick={() => field.parent.moveField(field.name, field.name)}
        cursor="grab"
        {...props}
      />
    )
)
