import _ from "lodash/fp.js"
import { observable } from "mobx"
// import F from "futil"
// import Ajv from "ajv/dist/2020.js"

const mutable = _.convert({ immutable: false })

// let ajv = new Ajv({
//   strict: true,
//   useDefaults: true,
//   coerceTypes: true,
// })

// let v = ajv.compile({
//   type: "object",
//   properties: {
//     a: {
//       type: "array",
//       items: {
//         type: "object",
//         properties: {
//           a: { type: "string" },
//           b: {
//             type: "string",
//             default: "Smith",
//           },
//         },
//       },
//     },
//   },
// })

// let x = { a: [{ a: 0 }] }

// v(x)

// console.info(x)
// console.info(v.errors)

let foo = [1, 2, 3]

foo.splice(1, 0, 10)

console.info(foo)

// const target = observable({ a: [1, 2, 3] })

// const a = new Proxy(target.a, {
//   get(obj, prop) {
//     console.info("get", prop)
//     return obj[prop]
//   },
//   set(obj, prop, value, ...x) {
//     console.info("set", x)
//     obj[prop] = value
//     return true
//   },
// })

// console.info(a)

// a.splice(1, 1)

// console.info(a)
