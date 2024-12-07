import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import {
  TextAreaField as RACTextAreaField,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from "#ui-rats/rats/forms/TextField.tsx"

interface TextFieldProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACTextFieldProps,
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

export function TextField<T extends FieldValues, N extends FieldPath<T>>({
  // useController props
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // TextField props
  isDisabled,
  ...props
}: TextFieldProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACTextField
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

export function TextArea<T extends FieldValues, N extends FieldPath<T>>({
  // useController props
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // TextAreaField props
  isDisabled,
  ...props
}: TextFieldProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACTextAreaField
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
