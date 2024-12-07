import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from "#ui-rats/rats/forms/CheckboxGroup.tsx"

interface CheckboxGroupProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACCheckboxGroupProps,
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

export function CheckboxGroup<T extends FieldValues, N extends FieldPath<T>>({
  // useController props
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // CheckboxGroup props
  isDisabled,
  ...props
}: CheckboxGroupProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACCheckboxGroup
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
