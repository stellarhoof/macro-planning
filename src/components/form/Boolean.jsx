import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { Checkbox, FormLabel } from "@chakra-ui/react"
import { Field } from "./Field.jsx"

export const Boolean = observer(
  forwardRef((props, ref) => (
    <Field {...props}>
      <Checkbox
        ref={ref}
        as={FormLabel}
        isChecked={props.field.value}
        onChange={(e) => (props.field.value = e.target.checked)}
        fontWeight="normal"
        {...props.field.schema.control.props}
      >
        {props.field.schema.title}
      </Checkbox>
    </Field>
  ))
)
