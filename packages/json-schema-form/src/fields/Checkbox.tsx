import { useObjectRef } from "react-aria"
import type { CheckboxProps as RACCheckboxProps } from "react-aria-components"
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form"

import { Checkbox as RACCheckbox } from "#ui-rats/rats/forms/Checkbox.tsx"

interface CheckboxProps<T extends FieldValues, N extends FieldPath<T>>
  extends Omit<UseControllerProps<T, N>, "disabled">,
    Omit<
      RACCheckboxProps,
      // These props are provided by react-hook-form
      | "name"
      | "onBlur"
      | "onChange"
      | "isSelected"
      | "defaultSelected"
      | "isRequired"
      | "isInvalid"
      | "inputRef"
      // Validation is managed by react-hook-form
      | "validate"
      | "validationBehavior"
    > {}

export function Checkbox<T extends FieldValues, N extends FieldPath<T>>({
  name,
  rules,
  control,
  defaultValue,
  shouldUnregister,
  // Checkbox props
  isDisabled,
  ...props
}: CheckboxProps<T, N>) {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    disabled: isDisabled,
    defaultValue,
    shouldUnregister,
  })
  return (
    <RACCheckbox
      {...props}
      inputRef={useObjectRef(field.ref)}
      name={field.name}
      isSelected={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isDisabled={field.disabled}
      isRequired={!!rules?.required}
      isInvalid={fieldState.invalid}
      validationBehavior="aria"
    />
  )
}
