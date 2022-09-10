import { useState, forwardRef } from "react"
import {
  NumberInput as NumberInputComponent,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

export const NumberInput = forwardRef((props, ref) => (
  <NumberInputComponent ref={ref} {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInputComponent>
))
