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

// ajv.compile({
//   $id: "someSchema",
//   type: "object",
//   allOf: [
//     {
//       $id: "firstName",
//       properties: {
//         firstName: { type: "string" },
//       },
//       required: ["firstName"],
//     },
//     {
//       $id: "lastName",
//       properties: {
//         lastName: { type: "string" },
//       },
//       required: ["lastName"],
//     },
//     {
//       $id: "email",
//       properties: {
//         email: { type: "string" },
//       },
//       required: ["email"],
//     },
//   ],
// })

console.time()
ajv.validate(
  {
    // $id: "someSchema",
    type: "object",
    required: ["firstName"],
    dependentRequired: {
      firstName: ["lastName"],
    },
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
    },
  },
  { firstName: "this" }
)
console.timeEnd()

console.info(ajv.getSchema("").schema)

console.time()
// Cannot compile a schema with the same id
ajv.validate(
  {
    // $id: "someSchema",
    type: "string",
  },
  "that"
)
console.timeEnd()

console.info(ajv.getSchema("").schema)

// ajv.validate({ $ref: "someSchema#/properties/firstName" }, "Alex")
// console.info(ajv.errors)

// ajv.validate(
//   { $ref: "someSchema#/allOf/0/properties/firstName" },
//   { firstName: 42 }
// )
// console.info(ajv.errors)
