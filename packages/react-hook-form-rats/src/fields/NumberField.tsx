import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import {
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
} from "#ui-rats/rats/forms/NumberField.tsx"

interface NumberFieldProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACNumberFieldProps,
      // These props are provided by react-hook-form
      | "name"
      | "onBlur"
      | "onChange"
      | "value"
      | "defaultValue"
      | "isRequired"
      | "isInvalid"
      // Validation is managed by react-hook-form
      | "minValue"
      | "maxValue"
      | "validate"
      | "validationBehavior"
      | "errorMessage"
    > {}

export function NumberField<T extends FieldValues, N extends FieldPath<T>>({
  // useController props
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // NumberField props
  isDisabled,
  ...props
}: NumberFieldProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACNumberField
      {...props}
      ref={field.ref}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isDisabled={field.disabled}
      isRequired={!!rules?.required}
      isInvalid={fieldState.invalid}
      validationBehavior="aria"
      errorMessage={fieldState.error?.message}
    />
  )
}
