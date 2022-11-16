import _ from "lodash/fp"
import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import {
  Grid,
  Input,
  Checkbox,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react"
import { OptionsSelect } from "../../Selects.jsx"
import { Field } from "../Field.jsx"
import { FieldErrors } from "../FieldErrors.jsx"
import { MoveField, RemoveField } from "../FieldActions.jsx"

const FieldActionsWrapper = observer(({ field, children }) =>
  field.parent?.moveField || field.parent?.removeField ? (
    <InputGroup>
      <InputLeftAddon
        as={MoveField}
        field={field}
        hidden={field.disabled}
        sx={{ p: 0 }}
      />
      {children}
      <InputRightAddon
        as={RemoveField}
        field={field}
        hidden={field.disabled}
        sx={{ p: 0 }}
      />
    </InputGroup>
  ) : (
    children
  )
)

export const String = forwardRef(({ field, ...props }, ref) => (
  <FieldActionsWrapper field={field}>
    <Input
      ref={ref}
      defaultValue={field.value}
      onChange={(e) => (field.value = e.target.value)}
      {...props}
    />
  </FieldActionsWrapper>
))

export const Number = forwardRef(({ field, ...props }, ref) => (
  <FieldActionsWrapper field={field}>
    <NumberInput
      ref={ref}
      defaultValue={field.value}
      onChange={(x) => (field.value = _.toNumber(x))}
      {...props}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FieldActionsWrapper>
))

export const Boolean = forwardRef(({ field, ...props }, ref) => (
  <>
    <Checkbox
      ref={ref}
      value={true}
      defaultChecked={!!field.value}
      onChange={(e) => (field.value = e.target.checked ? true : undefined)}
      sx={{ alignItems: "baseline" }}
      {...props}
    >
      <FormLabel sx={{ fontWeight: "normal" }}>{field.schema.title}</FormLabel>
      {field.schema.description && (
        <FormHelperText>{field.schema.description}</FormHelperText>
      )}
    </Checkbox>
    <FieldErrors field={field} />
  </>
))

export const Enum = observer(
  forwardRef(({ field, ...props }, ref) => (
    <OptionsSelect
      ref={ref}
      defaultValue={field.value}
      onChange={(e) => (field.value = e.target.value)}
      options={field.schema.enum}
      {...props}
    />
  ))
)

const Collection = observer(
  forwardRef(({ field, ...props }, ref) => (
    <Grid ref={ref} {...props}>
      {_.map(
        (field) => (
          <Field key={field.id} field={field} />
        ),
        field.fields
      )}
    </Grid>
  ))
)

export const Array = Collection

export const Object = Collection
