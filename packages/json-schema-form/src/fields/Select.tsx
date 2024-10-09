import {
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
} from "#ui-rats/rats/pickers/Select.tsx"

interface SelectProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACSelectProps<FieldPathValue<T, N>>,
      // These props are provided by react-hook-form
      | "name"
      | "onBlur"
      | "onSelectionChange"
      | "selectedKey"
      | "defaultSelectedKey"
      | "isRequired"
      | "isInvalid"
      | "inputRef"
      // Validation is managed by react-hook-form
      | "validate"
      | "validationBehavior"
      | "errorMessage"
    > {}

export function Select<T extends FieldValues, N extends FieldPath<T>>({
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // Select props
  isDisabled,
  ...props
}: SelectProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACSelect
      {...props}
      name={field.name}
      selectedKey={field.value}
      onSelectionChange={field.onChange}
      onBlur={field.onBlur}
      isDisabled={field.disabled}
      isRequired={!!rules?.required}
      isInvalid={fieldState.invalid}
      validationBehavior="aria"
      errorMessage={fieldState.error?.message}
    />
  )
}
