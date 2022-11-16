import _ from "lodash/fp.js"
import { observer } from "mobx-react-lite"
import { FormErrorMessage, FormErrorIcon } from "@chakra-ui/react"

export const FieldErrors = observer(({ field }) =>
  field.validationMessage?.split("\n").map((message) => (
    <FormErrorMessage key={message}>
      <FormErrorIcon />
      {_.upperFirst(message)}
    </FormErrorMessage>
  ))
)
