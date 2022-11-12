import _ from "lodash/fp"
import { observer } from "mobx-react-lite"
import { chakra, Flex, Button, Heading, Box } from "@chakra-ui/react"
import { createMobxForm } from "./util/json-schema-form.js"
import { OptionsCheckboxes } from "./components/Selects.jsx"
import { removeBlankLeaves } from "./util/futil.js"

const schema = {
  type: "object",
  maxProperties: 1,
  properties: {
    arr: {
      type: "array",
      items: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          job: { type: "string" },
        },
      },
    },
    obj: {
      type: "object",
      required: ["zebra"],
      properties: {
        zebra: { type: "string" },
        lion: { type: "string" },
        crocodile: { type: "string" },
      },
    },
  },
}

const value = { arr: [{}], obj: { lion: "Roar!" } }

// const value = { arr: [{ foo: "foo" }], obj: { foo: "this" } }

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     required: ["foo"],
//     properties: {
//       foo: { type: "string" },
//       bar: { type: "string" },
//     },
//   },
// }

// const value = [{ foo: "foo" }]

// const schema = { type: "string" }

// const value = "foo"

const form = createMobxForm(schema, value)

const options = _.map(
  (value) => ({ value, label: value }),
  [
    "fields.arr",
    "fields.arr.fields.0",
    "fields.arr.fields.0.fields.foo",
    "fields.arr.fields.0.fields.bar",
    "fields.obj",
    "fields.obj.fields.foo",
    "fields.obj.fields.bar",
    "fields.obj.fields.zoo",
  ]
)

const toggle = (property) => (paths) => {
  const values = _.map("value", options)
  const setTrue = _.intersection(values, paths)
  const setFalse = _.difference(values, paths)
  for (const path of setTrue) {
    const field = _.get(path, form)
    if (_.has(property, field)) field[property] = true
  }
  for (const path of setFalse) {
    const field = _.get(path, form)
    if (_.has(property, field)) field[property] = false
  }
}

const Flags = () => (
  <Flex sx={{ gap: 4, flexDirection: "column" }}>
    <Button onClick={form.validate}>Validate</Button>
    <Heading>Toggle Required</Heading>
    <Flex sx={{ gap: 2, flexDirection: "column" }}>
      <OptionsCheckboxes options={options} onChange={toggle("required")} />
    </Flex>
    <Heading>Toggle Disabled</Heading>
    <Flex sx={{ gap: 2, flexDirection: "column" }}>
      <OptionsCheckboxes options={options} onChange={toggle("disabled")} />
    </Flex>
    <Heading>Toggle Hidden</Heading>
    <Flex sx={{ gap: 2, flexDirection: "column" }}>
      <OptionsCheckboxes options={options} onChange={toggle("hidden")} />
    </Flex>
  </Flex>
)

const Form = () => (
  <chakra.form
    noValidate
    onSubmit={(e) => e.preventDefault()}
    sx={{ flexBasis: "30vw" }}
  >
    <form.schema.control.component field={form} />
  </chakra.form>
)

const Values = observer(() => (
  <>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Previous</Heading>
      {JSON.stringify(value, null, 2)}
    </Box>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Current</Heading>
      {JSON.stringify(form.value, null, 2)}
    </Box>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Validated</Heading>
      {JSON.stringify(removeBlankLeaves(form.value), null, 2)}
    </Box>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Patch</Heading>
      {JSON.stringify(form.getPatch(), null, 2)}
    </Box>
  </>
))

export const TestForm = () => (
  <Flex sx={{ gap: 8, p: 8, w: "100%" }}>
    <Flags />
    <Form />
    <Values />
  </Flex>
)
