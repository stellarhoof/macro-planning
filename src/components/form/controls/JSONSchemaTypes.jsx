import _ from "lodash/fp.js"
import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import {
  Input,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  ButtonGroup,
  Tag,
  TagLeftIcon,
  FormLabel,
} from "@chakra-ui/react"
import { MdDragIndicator } from "react-icons/md"
import { OptionsSelect } from "../../Selects.jsx"
import {
  AddSchemaItem,
  MoveSchemaItem,
  RemoveSchemaItem,
  SchemaFieldControl,
  SchemaTitle,
  SchemaFieldErrors,
  SchemaDescription,
  SchemaFieldsGrid,
} from "../Field.jsx"

const SchemaActionsInputGroup = ({ schema, children }) =>
  schema.field.parentSchema?.field?.addItem ||
  schema.field.parentSchema?.field?.removeItem ? (
    <InputGroup>
      <InputLeftAddon
        as={MoveSchemaItem}
        schema={schema}
        size="sm"
        sx={{ p: 0 }}
      />
      {children}
      <InputRightAddon
        as={RemoveSchemaItem}
        schema={schema}
        size="sm"
        sx={{ p: 0 }}
      />
    </InputGroup>
  ) : (
    children
  )

// TODO: This should be part of Number/String
export const Enum = observer(
  forwardRef(({ schema, onChange, ...props }, ref) => (
    <SchemaFieldControl schema={schema} {...props}>
      <SchemaTitle schema={schema} />
      <OptionsSelect
        ref={ref}
        defaultValue={schema.field.value}
        onChange={(e) => {
          e.stopPropagation()
          schema.field.value = e.target.value
          onChange?.(e)
        }}
        options={schema.enum || schema.field.options}
        {...props}
      />
      <SchemaDescription schema={schema} />
      <SchemaFieldErrors schema={schema} />
    </SchemaFieldControl>
  ))
)

export const String = forwardRef(({ schema, onChange, ...props }, ref) => (
  <SchemaFieldControl schema={schema} {...props}>
    <SchemaTitle schema={schema} />
    <SchemaActionsInputGroup schema={schema}>
      <Input
        ref={ref}
        defaultValue={schema.field.value}
        onChange={(e) => {
          e.stopPropagation()
          schema.field.value = e.target.value
          onChange?.(e)
        }}
      />
    </SchemaActionsInputGroup>
    <SchemaDescription schema={schema} />
    <SchemaFieldErrors schema={schema} />
  </SchemaFieldControl>
))

export const Number = forwardRef(({ schema, onChange, ...props }, ref) => (
  <SchemaFieldControl schema={schema} {...props}>
    <SchemaTitle schema={schema} />
    <SchemaActionsInputGroup schema={schema}>
      <NumberInput
        ref={ref}
        defaultValue={schema.field.value}
        onChange={(x) => {
          schema.field.value = _.toNumber(x)
          onChange?.(x)
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </SchemaActionsInputGroup>
    <SchemaDescription schema={schema} />
    <SchemaFieldErrors schema={schema} />
  </SchemaFieldControl>
))

export const Boolean = forwardRef(({ schema, onChange, ...props }, ref) => (
  <SchemaFieldControl
    ref={ref}
    schema={schema}
    as={Checkbox}
    value={true}
    defaultChecked={!!schema.field.value}
    onChange={(e) => {
      e.stopPropagation()
      schema.field.value = !e.target.checked
      onChange?.(e)
    }}
    sx={{ alignItems: "baseline" }}
    {...props}
  >
    <SchemaTitle schema={schema} />
    <SchemaDescription schema={schema} />
    <SchemaFieldErrors schema={schema} />
  </SchemaFieldControl>
))

const SchemaLegend = observer(
  ({ schema }) =>
    schema.title && (
      <FormLabel as="legend">
        <Tag cursor="grab">
          {!schema.field.disabled && (
            <TagLeftIcon aria-label="Move Item" as={MdDragIndicator} />
          )}
          {schema.title}
        </Tag>
      </FormLabel>
    )
)

const Collection = forwardRef(({ schema, sx, ...props }, ref) => (
  <SchemaFieldControl
    ref={ref}
    schema={schema}
    as="fieldset"
    sx={{
      p: 3,
      pos: "relative",
      borderRadius: "base",
      borderWidth: "1px",
      borderColor: "gray.300",
      "> [aria-label='Schema Actions']": {
        pos: "absolute",
        top: schema.title ? -8 : -3,
        right: 2.5,
        zIndex: 2,
      },
      "> [aria-label='Move Item']": {
        pos: "absolute",
        top: schema.title ? -8 : -3,
        left: 1,
        zIndex: 2,
      },
      ...sx,
    }}
    {...props}
  >
    <ButtonGroup isAttached aria-label="Schema Actions">
      <AddSchemaItem schema={schema} />
      <RemoveSchemaItem schema={schema} />
    </ButtonGroup>
    <SchemaLegend schema={schema} />
    <SchemaDescription schema={schema} />
    <SchemaFieldErrors schema={schema} />
    <SchemaFieldsGrid ref={ref} schema={schema} />
  </SchemaFieldControl>
))

export const Array = Collection

export const Object = Collection
