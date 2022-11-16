import _ from "lodash/fp"
import Ajv from "ajv"
import { observable } from "mobx"
import { createForm } from "../json-schema-form/index.js"
import { partitionObject, removeBlankLeaves } from "../util/futil.js"
import { setSchemaDefaults } from "./schema.js"

const ajv = new Ajv({
  strict: true,
  verbose: true,
  allErrors: true,
  keywords: [
    { keyword: "field", valid: true },
    { keyword: "layout", valid: true },
    { keyword: "effect", valid: true },
    { keyword: "control", valid: true },
  ],
})

const getErrorPath = (e) => {
  let path = e.instancePath.replace("/", "").replaceAll("/", ".")
  if (e.keyword === "required") path = `${path}.${e.params.missingProperty}`
  return path
}

const getErrorMessage = (e) => {
  if (e.keyword === "required") return "this field is required"
  return e.message
}

const validate = (schema, value) => {
  ajv.validate(schema, removeBlankLeaves(value))
  return _.flow(
    _.groupBy(getErrorPath),
    _.mapValues((errors) => errors.map(getErrorMessage).join("\n"))
  )(ajv.errors)
}

export const createMobxForm = (schema, value, submit) => {
  setSchemaDefaults(schema)
  const form = createForm(schema, value, {
    createStore: observable,
    mapField: observable,
    validate,
  })
  form.submit = () => form.reportValidity() && submit(form)
  return form
}

// TODO: $unset all blank values and send the rest
// Produce an object that can be used as-is to update a mongo record
// https://github.com/feathersjs-ecosystem/feathers-mongodb#querying
export const getMongoPatch = (form) => {
  // const [unset, set] = partitionObject(form.getFormData())
  // const [arrays, objects] = partitionObject(
  //   (v, k) => k.match(/\d/),
  //   set
  // )
  // from = removeBlanks(flattenObjectNotArrays(from))
  // to = removeBlanks(flattenObjectNotArrays(to))
  // const [$unset, $set] = _.flow(
  //   F.pickByIndexed((v, k) => !_.isEqual(from[k], to[k])),
  //   F.mapValuesIndexed((v, k) => to[k]),
  //   partitionObject(_.isUndefined)
  // )(_.merge(from, to))
  // return _.isEmpty($unset)
  //   ? $set
  //   : { ...$set, $unset: _.mapValues(_.constant(true), $unset) }
}
