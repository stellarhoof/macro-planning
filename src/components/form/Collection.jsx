import _ from "lodash/fp"
import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { Grid } from "@chakra-ui/react"
import { Field } from "./Field.jsx"
import { useControlEffect } from "./hooks.js"

export const Collection = observer(
  forwardRef((props, ref) => {
    useControlEffect(props.field)
    return (
      <Field isCollection {...props}>
        <Grid ref={ref} {...props.field.schema.control.props}>
          {_.map(
            (field) => (
              <field.schema.control.component
                key={field.id}
                field={field}
                parent={props.field}
              />
            ),
            props.field.fields
          )}
        </Grid>
      </Field>
    )
  })
)
