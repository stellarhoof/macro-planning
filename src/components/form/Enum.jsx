import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { OptionsSelect } from "../Selects.jsx"
import { Field } from "./Field.jsx"

export const Enum = observer(
  forwardRef((props, ref) => (
    <Field {...props}>
      <OptionsSelect
        ref={ref}
        value={props.field.value}
        onChange={(e) => (props.field.value = e.target.value)}
        options={props.field.schema.enum}
        {...props.field.schema.control.props}
      />
    </Field>
  ))
)
