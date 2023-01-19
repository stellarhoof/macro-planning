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

export const SchemaFieldControl = observer(
  forwardRef(({ schema, ...props }, ref) => {
    if (_.isFunction(schema.field.effect)) {
      useEffect(() => {
        const disposers = []
        schema.field.effect(schema, {
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
        hidden={schema.field.hidden}
        isRequired={schema.field.required}
        isDisabled={schema.field.disabled}
        isReadOnly={schema.field.readonly}
        isInvalid={schema.field.validationMessage}
        {...props}
      />
    )
  })
)

export const SchemaTitle = ({ schema, children, ...props }) =>
  schema.title && <FormLabel {...props}>{schema.title}</FormLabel>

export const SchemaDescription = ({ schema, ...props }) =>
  schema.description && (
    <FormHelperText {...props}>{schema.description}</FormHelperText>
  )

export const SchemaFieldErrors = observer(({ schema }) =>
  schema.field.validationMessage?.split("\n").map((message) => (
    <FormErrorMessage key={message}>
      <FormErrorIcon />
      {_.upperFirst(message)}
    </FormErrorMessage>
  ))
)

export const SchemaFieldsGrid = observer(
  forwardRef(({ schema, ...props }, ref) => (
    <Grid ref={ref} {...props}>
      {_.map(
        (schema) => (
          <schema.field.control.component
            key={schema.field.id}
            schema={schema}
            // onChange={schema.field.reportValidity}
            {...schema.field.control.props}
          />
        ),
        schema.properties || schema.field?.items
      )}
    </Grid>
  ))
)

export const AddSchemaItem = observer(
  ({ schema, ...props }) =>
    !schema.field.disabled &&
    schema.field.addItem &&
    schema.field.canAddItem && (
      <IconButton
        size="xs"
        aria-label="Add Item"
        icon={<Icon as={MdAdd} boxSize="1.2em" />}
        onClick={() => schema.field.addItem()}
        {...props}
      />
    )
)

export const RemoveSchemaItem = observer(
  ({ schema, ...props }) =>
    !schema.field.disabled &&
    schema.field.parentSchema?.field?.removeItem &&
    schema.field.parentSchema?.field?.canRemoveItem && (
      <IconButton
        size="xs"
        aria-label="Remove Item"
        icon={<Icon as={MdRemove} boxSize="1.2em" />}
        onClick={() =>
          schema.field.parentSchema.field.removeItem(schema.field.name)
        }
        {...props}
      />
    )
)

export const MoveSchemaItem = observer(
  ({ schema, ...props }) =>
    !schema.field.disabled &&
    schema.field.parentSchema?.field?.addItem &&
    schema.field.parentSchema?.field?.removeItem && (
      <IconButton
        size="xs"
        aria-label="Move Item"
        icon={<Icon as={MdDragIndicator} boxSize="1.2em" />}
        cursor="grab"
        {...props}
      />
    )
)
