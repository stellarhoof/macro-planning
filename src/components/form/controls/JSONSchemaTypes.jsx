import _ from "lodash/fp"
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
  AddField,
  MoveField,
  RemoveField,
  FieldControl,
  FieldLabel,
  FieldErrors,
  FieldDescription,
  FieldsGrid,
} from "../Field.jsx"

const FieldActionsInputGroup = ({ field, children }) =>
  field.parent?.moveField || field.parent?.removeField ? (
    <InputGroup>
      <InputLeftAddon as={MoveField} field={field} size="sm" sx={{ p: 0 }} />
      {children}
      <InputRightAddon as={RemoveField} field={field} size="sm" sx={{ p: 0 }} />
    </InputGroup>
  ) : (
    children
  )

export const String = forwardRef(({ field, onChange, ...props }, ref) => (
  <FieldControl field={field} {...props}>
    <FieldLabel field={field} />
    <FieldActionsInputGroup field={field}>
      <Input
        ref={ref}
        defaultValue={field.value}
        onChange={(e) => {
          e.stopPropagation()
          field.value = e.target.value
          onChange?.(e)
        }}
      />
    </FieldActionsInputGroup>
    <FieldDescription field={field} />
    <FieldErrors field={field} />
  </FieldControl>
))

export const Number = forwardRef(({ field, onChange, ...props }, ref) => (
  <FieldControl field={field} {...props}>
    <FieldLabel field={field} />
    <FieldActionsInputGroup field={field}>
      <NumberInput
        ref={ref}
        defaultValue={field.value}
        onChange={(x) => {
          field.value = _.toNumber(x)
          onChange?.(x)
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FieldActionsInputGroup>
    <FieldDescription field={field} />
    <FieldErrors field={field} />
  </FieldControl>
))

export const Boolean = forwardRef(({ field, onChange, ...props }, ref) => (
  <FieldControl
    ref={ref}
    field={field}
    as={Checkbox}
    value={true}
    defaultChecked={!!field.value}
    onChange={(e) => {
      e.stopPropagation()
      field.value = !e.target.checked
      onChange?.(e)
    }}
    sx={{ alignItems: "baseline" }}
    {...props}
  >
    <FieldLabel field={field} />
    <FieldDescription field={field} />
    <FieldErrors field={field} />
  </FieldControl>
))

export const Enum = observer(
  forwardRef(({ field, onChange, ...props }, ref) => (
    <FieldControl field={field} {...props}>
      <FieldLabel field={field} />
      <OptionsSelect
        ref={ref}
        defaultValue={field.value}
        onChange={(e) => {
          e.stopPropagation()
          field.value = e.target.value
          onChange?.(e)
        }}
        options={field.schema.enum}
        {...props}
      />
      <FieldDescription field={field} />
      <FieldErrors field={field} />
    </FieldControl>
  ))
)

const FieldLegend = observer(
  ({ field }) =>
    field.schema.title && (
      <FormLabel as="legend">
        <Tag cursor="grab">
          {!field.disabled && (
            <TagLeftIcon
              aria-label="Move Field"
              as={MdDragIndicator}
              onClick={() => field.parent.moveField(field.name, field.name)}
            />
          )}
          {field.schema.title}
        </Tag>
      </FormLabel>
    )
)

const Collection = forwardRef(({ field, sx, ...props }, ref) => (
  <FieldControl
    ref={ref}
    field={field}
    as="fieldset"
    sx={{
      p: 3,
      pos: "relative",
      borderRadius: "base",
      borderWidth: "1px",
      borderColor: "gray.300",
      "> [aria-label='Field Actions']": {
        pos: "absolute",
        top: field.schema.title ? -8 : -3,
        right: 2.5,
        zIndex: 2,
      },
      "> [aria-label='Move Field']": {
        pos: "absolute",
        top: field.schema.title ? -8 : -3,
        left: 1,
        zIndex: 2,
      },
      ...sx,
    }}
    {...props}
  >
    <ButtonGroup isAttached aria-label="Field Actions">
      <AddField field={field} />
      <RemoveField field={field} />
    </ButtonGroup>
    <FieldLegend field={field} />
    <FieldDescription field={field} />
    <FieldErrors field={field} />
    <FieldsGrid ref={ref} field={field} />
  </FieldControl>
))

export const Array = Collection

export const Object = Collection
