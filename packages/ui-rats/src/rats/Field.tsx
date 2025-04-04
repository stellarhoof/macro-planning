import { type ForwardedRef, type ReactNode } from "react"
import { useField } from "react-aria"
import {
  Group,
  type LabelProps,
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
  type GroupProps as RACGroupProps,
  Input as RACInput,
  type InputProps as RACInputProps,
  Label as RACLabel,
  TextArea as RACTextArea,
  type TextAreaProps as RACTextAreaProps,
  Text,
  type TextProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

interface InputProps extends RACInputProps {
  ref?: ForwardedRef<HTMLInputElement>
  className?: string
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={twMerge(
        "min-w-0 flex-1 bg-white px-3 py-1.5 text-sm text-gray-800 outline disabled:text-gray-200",
        props.className,
      )}
    />
  )
}

interface TextAreaProps extends RACTextAreaProps {
  ref?: ForwardedRef<HTMLTextAreaElement>
  className?: string
}

export function TextArea(props: TextAreaProps) {
  return (
    <RACTextArea
      {...props}
      className={twMerge(
        "min-w-0 bg-white px-3 py-1.5 text-sm text-gray-800 outline disabled:text-gray-200",
        props.className,
      )}
    />
  )
}

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-gray-500",
        props.className,
      )}
    />
  )
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-gray-600", props.className)}
    />
  )
}

interface FieldErrorProps extends RACFieldErrorProps {
  className?: string
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={twMerge("text-sm text-red-600", props.className)}
    />
  )
}

interface FieldGroupProps extends RACGroupProps {
  className?: string
}

export function FieldGroup(props: FieldGroupProps) {
  return (
    <Group
      {...props}
      className={twMerge(
        "group flex items-center h-9 bg-white border-2 rounded-lg overflow-hidden",
        props.className,
      )}
    />
  )
}

interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  className?: string
  label?: string
  isInvalid?: boolean
  description?: string
  errorMessage?: string
  children: ReactNode
}

export function Fieldset({
  label,
  description,
  isInvalid,
  errorMessage,
  children,
  className,
  ...props
}: FieldsetProps) {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useField({ label, description, isInvalid, errorMessage })
  return (
    <fieldset
      className={twMerge(
        "flex flex-col gap-4 border border-gray-400 p-4 rounded-md",
        className,
      )}
      {...fieldProps}
      {...props}
      data-invalid={isInvalid || undefined}
    >
      {label && (
        <Label elementType="legend" {...labelProps}>
          {label}
        </Label>
      )}
      {description && (
        <Description {...descriptionProps}>{description}</Description>
      )}
      {errorMessage && (
        <Text
          slot="errorMessage"
          className="text-sm text-red-600"
          {...errorMessageProps}
        >
          {errorMessage}
        </Text>
      )}
      {children}
    </fieldset>
  )
}
