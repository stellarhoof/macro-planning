// import _ from "lodash/fp.js"
// import { observable } from "mobx"
// import F from "futil"
import Ajv from "ajv/dist/2020.js"

// const mutable = _.convert({ immutable: false })

let ajv = new Ajv({
  strict: true,
  useDefaults: true,
  allErrors: true,
  coerceTypes: true,
})

let v = ajv.compile({
  type: "object",
  properties: {
    a: {
      type: "array",
      items: {
        type: "object",
        required: ["b"],
        properties: {
          a: { type: "number", multipleOf: 2, maximum: 10 },
          b: { type: "string" },
        },
      },
    },
  },
})

let message = `this
that`

console.info(message.split("\n"))

let x = { a: [{ a: 11 }] }

v(x)

console.info(v.errors)
