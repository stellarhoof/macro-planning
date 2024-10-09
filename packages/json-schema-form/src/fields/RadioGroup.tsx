import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
} from "#ui-rats/rats/forms/RadioGroup.tsx"

interface RadioGroupProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACRadioGroupProps,
      // These props are provided by react-hook-form
      | "name"
      | "onBlur"
      | "onChange"
      | "value"
      | "defaultValue"
      | "isRequired"
      | "isInvalid"
      // Validation is managed by react-hook-form
      | "minLength"
      | "maxLength"
      | "pattern"
      | "validate"
      | "validationBehavior"
      | "errorMessage"
    > {}

export function RadioGroup<T extends FieldValues, N extends FieldPath<T>>({
  // useController props
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // RadioGroup props
  isDisabled,
  ...props
}: RadioGroupProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACRadioGroup
      {...props}
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
