import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { OptionsSelect } from "../../Selects.jsx"

export const Enum = observer(
  forwardRef(({ field, ...props }, ref) => (
    <OptionsSelect
      ref={ref}
      defaultValue={field.value}
      onChange={(e) => (field.value = e.target.value)}
      options={field.schema.enum}
      {...props}
    />
  ))
)
