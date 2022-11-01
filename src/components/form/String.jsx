import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { Input } from "@chakra-ui/react"
import { Field } from "./Field.jsx"

export const String = observer(
  forwardRef((props, ref) => (
    <Field {...props}>
      <Input
        ref={ref}
        value={props.field.value}
        onChange={(e) => (props.field.value = e.target.value)}
        {...props.field.schema.control.props}
      />
    </Field>
  ))
)
