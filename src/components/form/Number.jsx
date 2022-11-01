import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { NumberInput, NumberInputField } from "@chakra-ui/react"
import { Field } from "./Field.jsx"

export const Number = observer(
  forwardRef((props, ref) => (
    <Field {...props}>
      <NumberInput
        ref={ref}
        value={props.field.value}
        onChange={(e) => (props.field.value = e.target.value)}
        {...props.field.schema.control.props}
      >
        <NumberInputField />
      </NumberInput>
    </Field>
  ))
)
