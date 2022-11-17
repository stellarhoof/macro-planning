import _ from "lodash/fp"
import Ajv from "ajv"
import { observable } from "mobx"
import { createForm } from "../json-schema-form/index.js"
import { removeBlankLeaves } from "../util/futil.js"
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

const toSchemaPath = (x) => {
  if (!x) return ""
  const path = x
    .replaceAll(/\d+/g, "items")
    .replaceAll(".items", "/items")
    .replaceAll(".", "/properties/")
  return path.startsWith("items") ? path : `/properties/${path}`
}

const validate = (field, form) => {
  const path = `${form.schema.$id}#${toSchemaPath(field.path)}`
  const validator = ajv.getSchema(path)
  validator(removeBlankLeaves(field.value))
  return _.flow(
    _.groupBy(getErrorPath),
    _.mapValues((errors) => errors.map(getErrorMessage).join("\n"))
  )(validator.errors)
}

export const createMobxForm = (schema, value, submit) => {
  setSchemaDefaults(schema)
  schema.$id = _.uniqueId()
  ajv.compile(schema)
  const form = createForm(schema, value, {
    createStore: observable,
    mapField: observable,
    validate: (field) => validate(field, form),
  })
  form.submit = () => form.reportValidity() && submit(form)
  return form
}
