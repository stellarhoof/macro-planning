import _ from "lodash/fp.js"
import F from "futil"
import { joinPaths } from "../util/futil.js"

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

const _getDefaultValueRec = (schema, path, root) => {
  let value = _.get(path, root)

  if (!_.isEqual(schema.type, typeOf(value))) {
    value = schema.default ?? _.cloneDeep(empty[schema.type])
    if (!_.isUndefined(value)) F.setOn(path, value, root)
  }

  if (!_.isEmpty(schema.properties))
    F.eachIndexed(
      (v, k) => _getDefaultValueRec(v, joinPaths(path, k), root),
      schema.properties
    )

  if (!_.isEmpty(schema.items)) {
    _.times(
      (i) => _getDefaultValueRec(schema.items, joinPaths(path, i), root),
      _.size(_.isArray(value) ? value : [])
    )
  }
}

// Inspired by https://github.com/sagold/json-schema-library#gettemplate
export const fillDefaultValues = (schema, value) => {
  const root = _.cloneDeep({ __root__: value })
  _getDefaultValueRec(schema, "__root__", root)
  return root["__root__"]
}

// TODO
export const extractSubschema = (whitelist, schema) => {
  // const byPointer = _.fromPairs()
  return F.reduceTree((x) => x.properties)({}, schema)
}

// E.g. toSchemaPath('foo.bar') => '/properties/foo/properties/bar'
export const toSchemaPath = (x) => {
  if (!x) return ""
  const path = x
    .replaceAll(/\d+/g, "items")
    .replaceAll(".items", "/items")
    .replaceAll(".", "/properties/")
  return path.startsWith("items") ? path : `/properties/${path}`
}

export const Tree = F.tree(
  (x) => x.properties || (x.items && { items: x.items })
)
