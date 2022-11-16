import _ from "lodash/fp"
import React from "react"
import { observer } from "mobx-react-lite"
import { chakra, Grid, Heading, Box, Checkbox } from "@chakra-ui/react"
import { createMobxForm } from "./util/json-schema-form.js"
import { Form } from "./components/form/Form.jsx"
import { NoLayout } from "./components/form/layouts/NoLayout.jsx"
import { getFormData, getFormFields } from "./json-schema-form/createForm.js"

const schema = {
  type: "object",
  title: "Form",
  description: "People and animals all live in harmony",
  properties: {
    scalarArray: {
      type: "array",
      items: { type: "string" },
    },
    // arr: {
    //   type: "array",
    //   items: {
    //     type: "object",
    //     required: ["name"],
    //     properties: {
    //       name: { type: "string" },
    //       job: {
    //         type: "string",
    //         enum: ["Analyst", "Courier", "Singer", "Mercenary"],
    //       },
    //       age: { type: "number", minimum: 10 },
    //       isMarried: {
    //         type: "boolean",
    //         description: "Did you in fact get married?",
    //         layout: { component: NoLayout },
    //       },
    //     },
    //   },
    // },
    // obj: {
    //   type: "object",
    //   required: ["zebra"],
    //   properties: {
    //     zebra: { type: "string" },
    //     lion: { type: "string" },
    //     giraffe: { type: "string" },
    //   },
    // },
  },
}

const value = {
  scalarArray: ["Pocahontas", "Snow White"],
  // arr: [{ name: "John Smith", job: "Mercenary", age: 34, isMarried: true }],
  // obj: { zebra: "Neiighhh!", lion: "Roar!", giraffe: "Who knows?" },
}

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

const flags = ["required", "readonly", "disabled", "hidden"]

const Flags = ({ form }) => (
  <Grid
    sx={{
      gap: 2,
      height: "fit-content",
      gridTemplateColumns: "repeat(5, 1fr)",
      alignItems: "center",
      justifyItems: "center",
    }}
  >
    <span />
    {_.map(
      (x) => (
        <b key={x}>{x}</b>
      ),
      flags
    )}
    {_.map(
      (field) => (
        <React.Fragment key={field.id}>
          <chakra.b sx={{ justifySelf: "start" }}>{field.path}</chakra.b>
          {_.map(
            (x) => (
              <Checkbox
                key={x}
                defaultChecked={field[x]}
                onChange={(e) => (field[x] = e.target.checked)}
              />
            ),
            flags
          )}
        </React.Fragment>
      ),
      getFormFields(form)
    )}
  </Grid>
)

const Value = observer(({ form }) => (
  <Grid sx={{ gridTemplateColumns: "1fr 1fr" }}>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Value</Heading>
      {JSON.stringify(getFormData(form), null, 2)}
    </Box>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Errors</Heading>
      {JSON.stringify(
        _.mapValues("validationMessage", getFormFields(form)),
        null,
        2
      )}
    </Box>
  </Grid>
))

const submit = {
  delayed: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  error: () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject("Your form Shucks!"), 1000)
    ),
}

export const TestForm = () => {
  const form = createMobxForm(schema, value, submit.error)
  return (
    <Grid
      sx={{ gap: 8, p: 8, w: "100%", gridTemplateColumns: "auto auto 1fr" }}
    >
      <Flags form={form} />
      <Form form={form} sx={{ w: "30vw" }} />
      <Value form={form} />
    </Grid>
  )
}
