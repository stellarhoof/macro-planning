import F from "futil"
import { forwardRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Grid } from "@chakra-ui/react"
import { withReactions } from "../../util/mobx.js"
import { Field } from "./Field.jsx"

const useControlEffect = (field) => {
  if (field.schema.control.effect)
    useEffect(
      () =>
        withReactions((reactions) =>
          field.schema.control.effect({ field, ...reactions })
        ),
      []
    )
}

// // https://github.com/mobxjs/mobx/discussions/3552
// const length = useComputed(() => f.value.length).get()

export const Collection = observer(
  forwardRef((props, ref) => {
    useControlEffect(props.field)
    return (
      <Field {...props}>
        <Grid ref={ref} {...props.field.schema.control.props}>
          {F.mapIndexed(
            (field, key) => (
              <field.schema.control.component key={key} field={field} />
            ),
            props.field.fields
          )}
        </Grid>
      </Field>
    )
  })
)
