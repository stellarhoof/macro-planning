import _ from "lodash/fp"
import { forwardRef } from "react"
import {
  useMergeRefs,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

export const Field = forwardRef(
  (
    {
      name,
      registerProps,
      label = _.startCase(name),
      as: As = Input,
      ...props
    },
    ref,
  ) => {
    let context = useFormContext()
    let error = context.formState.errors[name]
    let x = context.register(name, {
      required: registerProps?.required && "This field is required",
      ...registerProps,
    })
    return (
      <FormControl onBlur={x.onBlur} onChange={x.onChange} isInvalid={error}>
        {!_.isNull(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <As ref={useMergeRefs(x.ref, ref)} name={name} {...props} />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    )
  },
)
