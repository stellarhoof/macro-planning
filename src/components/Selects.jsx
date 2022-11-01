import _ from "lodash/fp"
import F from "futil"
import React from "react"
import stringify from "safe-stable-stringify"
import {
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react"

export const OptionsCheckboxes = ({ options, ...props }) => (
  <CheckboxGroup {...props}>
    {_.map(
      (x) => (
        <Checkbox key={x.value} value={x.value}>
          {x.label}
        </Checkbox>
      ),
      F.autoLabelOptions(options)
    )}
  </CheckboxGroup>
)

export const OptionsRadio = ({ options, ...props }) => (
  <RadioGroup {...props}>
    {_.map(
      (x) => (
        <Radio key={x.value} value={x.value}>
          {x.label}
        </Radio>
      ),
      F.autoLabelOptions(options)
    )}
  </RadioGroup>
)

export const ObjectOptionsRadio = ({ value, onChange, options, ...props }) => {
  const cached = React.useMemo(
    () => _.map(_.update("value", stringify), options),
    [_.size(options)]
  )
  return (
    <OptionsRadio
      value={stringify(value)}
      onChange={(e) => onChange(JSON.parse(e))}
      options={cached}
      {...props}
    />
  )
}

export const OptionsSelect = React.forwardRef(
  ({ options, placeholder = "Please Select...", ...props }, ref) => (
    <Select ref={ref} placeholder={placeholder} {...props}>
      {_.map(
        (x) => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ),
        F.autoLabelOptions(options)
      )}
    </Select>
  )
)

export const ObjectOptionsSelect = React.forwardRef(
  ({ value, onChange, options, ...props }, ref) => {
    const cached = React.useMemo(
      () => _.map(_.update("value", stringify), options),
      [_.size(options)]
    )
    return (
      <OptionsSelect
        ref={ref}
        value={stringify(value)}
        onChange={(e) => onChange(JSON.parse(e.target.value))}
        options={cached}
        {...props}
      />
    )
  }
)
