import { fromDate, getLocalTimeZone } from "@internationalized/date"
import type { DateValue } from "react-aria-components"

import {
  DatePicker,
  type DatePickerProps,
} from "#ui-rats/rats/dateAndTime/DatePicker.tsx"

import { useFieldContext } from "../contexts.ts"
import { commonFieldProps, type OmittedFieldProps } from "../util.ts"

export interface DatePickerFieldProps
  extends Omit<
    DatePickerProps<DateValue>,
    | OmittedFieldProps
    // Only relevant for uncontrolled fields.
    | "defaultValue"
    // Managed by Tanstack form.
    | "value"
    | "onChange"
    // Manually cast to js `Date`.
    | "minValue"
    | "maxValue"
    | "placeholderValue"
  > {
  minValue?: Date
  maxValue?: Date
  placeholderValue?: Date
}

function safeFromDate(value: Date | undefined, timezone: string) {
  return value ? fromDate(value, timezone) : null
}

export function DatePickerField(props: DatePickerFieldProps) {
  const field = useFieldContext<Date | undefined>()
  const tz = getLocalTimeZone()
  return (
    <DatePicker
      {...props}
      {...commonFieldProps(field)}
      minValue={safeFromDate(props.minValue, tz)}
      maxValue={safeFromDate(props.maxValue, tz)}
      placeholderValue={safeFromDate(props.placeholderValue, tz)}
      value={safeFromDate(field.state.value ?? undefined, tz)}
      onChange={(value) => {
        field.handleChange(value ? value.toDate() : undefined)
      }}
    />
  )
}
