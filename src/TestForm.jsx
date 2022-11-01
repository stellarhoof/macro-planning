import _ from "lodash/fp"
import { Observer } from "mobx-react-lite"
import { Flex, Button, Heading } from "@chakra-ui/react"
import { createMobxForm, getMongoPatch } from "./util/json-schema-form.js"
import { OptionsCheckboxes } from "./components/Selects.jsx"

const schema = {
  type: "object",
  title: "hey",
  properties: {
    arr: {
      type: "array",
      items: {
        type: "object",
        required: ["foo"],
        properties: {
          foo: { type: "string" },
          bar: { type: "string" },
        },
      },
    },
    obj: {
      type: "object",
      required: ["bar"],
      // readOnly: true,
      // maxProperties: 1,
      properties: {
        foo: { type: "string" },
        bar: { type: "string" },
        zoo: { type: "string" },
      },
    },
  },
}

const value = { arr: [{ foo: "foo" }], obj: { foo: "this" } }

const root = createMobxForm(schema, value)

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
    const field = _.get(path, root)
    if (_.has(property, field)) field[property] = true
  }
  for (const path of setFalse) {
    const field = _.get(path, root)
    if (_.has(property, field)) field[property] = false
  }
}

export const TestForm = () => (
  <Flex sx={{ gap: 8, p: 8, w: "100%" }}>
    <Flex sx={{ gap: 4, flexDirection: "column" }}>
      <Button onClick={root.validate}>Validate</Button>
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
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <root.schema.control.component field={root} />
    </form>
    <Observer>
      {() => (
        <Flex sx={{ gap: 8, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
          <div>
            <Heading>Saved</Heading>
            {JSON.stringify(value, null, 2)}
          </div>
          <div>
            <Heading>Value</Heading>
            {JSON.stringify(root.value, null, 2)}
          </div>
          {/* <span> */}
          {/*   <b>Patch: </b> {JSON.stringify(getMongoPatch(value, root.value))} */}
          {/* </span> */}
        </Flex>
      )}
    </Observer>
  </Flex>
)
