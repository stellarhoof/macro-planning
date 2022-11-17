import _ from "lodash/fp.js"
import F from "futil"
import { joinPaths } from "../util/futil"

const empty = {
  null: null,
  number: 0,
  integer: 0,
  boolean: false,
  string: "",
  array: [],
  object: {},
}

const typeOf = (value) => {
  if (_.isArray(value)) return "array"
  if (_.isNull(value)) return "null"
  return typeof value
}

let _getTemplateRec = (schema, path, template) => {
  let value = _.get(path, template)

  if (!_.isEqual(schema.type, typeOf(value))) {
    value = schema.default ?? _.cloneDeep(empty[schema.type])
    if (!_.isUndefined(value)) F.setOn(path, value, template)
  }

  if (!_.isEmpty(schema.properties))
    F.eachIndexed(
      (v, k) => _getTemplateRec(v, joinPaths(path, k), template),
      schema.properties
    )

  if (!_.isEmpty(schema.items)) {
    _.times(
      (i) => _getTemplateRec(schema.items, joinPaths(path, i), template),
      _.size(_.isArray(value) ? value : [])
    )
  }
}

// Inspired by https://github.com/sagold/json-schema-library#gettemplate
export const getTemplate = (schema, value) => {
  const template = _.cloneDeep({ __root__: value })
  _getTemplateRec(schema, "__root__", template)
  return template["__root__"]
}

export const extractSubschema = (whitelist, schema) => {}
