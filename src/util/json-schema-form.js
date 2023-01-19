import _ from "lodash/fp.js"
import Ajv from "ajv"
import { observable, extendObservable, toJS } from "mobx"
import { toJsonSchema, fromJsonSchema } from "../json-schema-form/index.js"
import { removeBlankLeaves } from "../util/futil.js"
import { setSchemaDefaults } from "./schema.js"

const ajv = new Ajv({ strict: true, verbose: true, allErrors: true })

const getErrorPath = (e) => {
  let path = e.instancePath.replace("/", "").replaceAll("/", ".")
  if (e.keyword === "required") path = `${path}.${e.params.missingProperty}`
  return path
}

const getErrorMessage = (e) => {
  if (e.keyword === "required") return "this field is required"
  return e.message
}

const mobxStore = {
  toStore: observable,
  fromStore: toJS,
  extendStore: extendObservable,
}

const validate = (schema) => {
  // The field's schema may have changed so we have to recompile
  ajv.validate(
    toJsonSchema(schema, mobxStore),
    removeBlankLeaves(schema.field.value)
  )
  return _.flow(
    _.groupBy(getErrorPath),
    _.mapValues((errors) => errors.map(getErrorMessage).join("\n"))
  )(ajv.errors)
}

export const createMobxFormSchema = (schema, value) => {
  setSchemaDefaults(schema)
  return fromJsonSchema(schema, { value, validate, ...mobxStore })
}
