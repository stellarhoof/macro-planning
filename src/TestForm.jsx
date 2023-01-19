import _ from "lodash/fp.js"
import React from "react"
import { observer } from "mobx-react-lite"
import { chakra, Grid, Heading, Box, Checkbox } from "@chakra-ui/react"
import { createMobxFormSchema as createMobxFormSchema } from "./util/json-schema-form.js"
import { Form } from "./components/form/Form.jsx"
import {
  getFlatSchemaValue,
  getFlatSchema,
} from "./json-schema-form/createFormSchema.js"

const mut = _.convert({ immutable: false })

const schema = {
  type: "object",
  title: "Form",
  description: "People and animals all live in harmony",
  properties: {
    scalarArray: {
      type: "array",
      items: { type: "string" },
    },
    arr: {
      type: "array",
      items: {
        type: "object",
        required: ["name"],
        title: "Person",
        properties: {
          name: {
            type: "string",
            description: "Full name of the person in question",
          },
          job: {
            type: "string",
            enum: ["Analyst", "Courier", "Singer", "Mercenary"],
            readOnly: true,
          },
          age: { type: "number", minimum: 10 },
          isMarried: {
            type: "boolean",
            description: "Did you in fact get married?",
          },
        },
      },
    },
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
  arr: [{ job: "Mercenary", age: 34, isMarried: true }],
  obj: { zebra: "Neiighhh!", lion: "Roar!", giraffe: "Who knows?" },
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

const flags = ["readonly", "required", "disabled", "hidden"]

const Flags = ({ schema }) => (
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
    {flags.map((path) => (
      <b key={path}>{path}</b>
    ))}
    {_.map(
      (schema) => (
        <React.Fragment key={schema.field.id}>
          <chakra.b sx={{ justifySelf: "start" }}>{schema.field.path}</chakra.b>
          {flags.map((path) => (
            <Checkbox
              key={path}
              defaultChecked={schema.field[path]}
              onChange={(e) => (schema.field[path] = e.target.checked)}
            />
          ))}
        </React.Fragment>
      ),
      getFlatSchema(schema)
    )}
  </Grid>
)

const Value = observer(({ schema }) => (
  <Grid sx={{ gridTemplateColumns: "1fr 1fr" }}>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Value</Heading>
      {JSON.stringify(getFlatSchemaValue(schema), null, 2)}
    </Box>
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <Heading>Errors</Heading>
      {JSON.stringify(
        _.mapValues(
          (schema) => schema.field.validationMessage,
          getFlatSchema(schema)
        ),
        null,
        2
      )}
    </Box>
  </Grid>
))

const submits = {
  delayed: () => new Promise((resolve) => setTimeout(resolve, 500)),
  error: () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject("Your form Shucks!"), 500)
    ),
}

export const TestForm = () => {
  const formSchema = createMobxFormSchema(schema, value)
  return (
    <Grid
      sx={{ gap: 8, p: 8, w: "100%", gridTemplateColumns: "auto auto 1fr" }}
    >
      <Flags schema={formSchema} />
      <Form schema={formSchema} submit={submits.error} sx={{ w: "30vw" }} />
      <Value schema={formSchema} />
    </Grid>
  )
}
