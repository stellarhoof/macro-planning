import _ from "lodash/fp"
import { forwardRef } from "react"
import { observer } from "mobx-react-lite"
import { Grid } from "@chakra-ui/react"
import { Field } from "../Field.jsx"

export const Collection = observer(
  forwardRef(({ field, ...props }, ref) => (
    <Grid ref={ref} {...props}>
      {_.map(
        (field) => (
          <Field key={field.id} field={field} />
        ),
        field.fields
      )}
    </Grid>
  ))
)
