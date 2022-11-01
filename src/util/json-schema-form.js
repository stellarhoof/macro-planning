import _ from "lodash/fp"
import F from "futil"
import Ajv from "ajv"
import { observable } from "mobx"
import { createForm } from "../json-schema-form/index.js"
import { controls } from "../components/form/index.js"
import {
  buildPath,
  filterTree,
  flattenObjectNotArrays,
  partitionObject,
} from "../util/futil.js"

// const expandOveerridePath = _.flow(
//   _.replace(".*", "/items"),
//   _.replace(".", ".properties."),
//   _.replace("/items", ".items"),
//   _.replace("*", "items")
// )

// const expandOverrides = _.flow(
//   // Remove non-object overrides so they don't replace the corresponding
//   // schema when merged
//   _.pickBy(_.isPlainObject),
//   _.mapKeys(expandOveerridePath),
//   F.unflattenObject
// )

// const removeSchemaFromParent = (schema, key, parents) => {
//   const parent = _.head(parents)
//   if (key === "*") {
//     delete parent.items
//   } else {
//     delete parent.properties[key]
//     if (parent.default) delete parent.default[key]
//     if (parent.required) parent.required = _.pull(key, parent.required)
//   }
// }

// // TODO: Change the way we build the schema: instead walk the passed schema
// // and accumulate paths that are in the overrides
// export const createFormSchema = (schema, overrides, mutate) => {
//   const rootOverrides = overrides[""]
//   const propertiesOverrides = _.omit("", overrides)
//   const expanded = !_.isEmpty(propertiesOverrides) && {
//     properties: expandOverrides(propertiesOverrides),
//   }
//   // TODO: Do not merge overrides that are not in schema
//   const cloned = _.merge(schema, { ...rootOverrides, ...expanded })

//   // Schema will be filtered to only these paths
//   const whitelist = _.keys(propertiesOverrides)
//   const isPathWhitelisted = (path) =>
//     // Keep root schema
//     _.isEmpty(path) ||
//     // Keep if a whitelisted path starts with this node's path so that
//     // whitelisting 'a.b.c' will keep paths ['a', 'a.b', 'a.b.c']
//     _.some(_.startsWith(path), whitelist)

//   // Now that the schema has been cloned, we can mutate it
//   Tree.walk((...args) => {
//     if (isPathWhitelisted(buildPath(...args))) {
//       adjustHidden(...args)
//       adjustDisabled(...args)
//       mutate?.(...args)
//     } else {
//       removeSchemaFromParent(...args)
//     }
//   })(cloned)

//   return cloned
// }

const ajv = new Ajv({
  strict: true,
  verbose: true,
  allErrors: true,
  coerceTypes: true,
  useDefaults: "empty",
  keywords: [{ keyword: "control", valid: true }],
})

const getSchemaComponent = (schema) => {
  // control = Component
  if (_.isFunction(schema?.control)) return schema.control
  // control = { component: Component }
  if (_.isFunction(schema?.control?.component)) return schema.control
  const name =
    // control = 'component'
    (_.isString(schema?.control) && schema.control) ||
    // control = { component: 'component' }
    (_.isString(schema?.control?.component) && schema.control.component) ||
    // Not a JSON schema type but useful to special case it
    (_.isArray(schema.enum) && "enum")
  return controls[name || schema.type]
}

const removeBlanks = filterTree()(F.isNotBlank)

const foo = F.walk((x) => x.properties || (x.items && { items: x.items }))(
  (schema, name, parents, parentsKeys) => {
    const parent = _.head(parents)
    // Set default title
    if (_.isUndefined(schema.title) && parent?.type !== "array")
      schema.title = _.startCase(name)
    // Set control component
    const component = getSchemaComponent(schema)
    if (!component) {
      const path = buildPath(schema, name, parents, parentsKeys)
      throw new Error(`No component for field at path "${buildPath(path)}"`)
    }
    if (!_.isPlainObject(schema.control)) schema.control = {}
    schema.control.component = component
  }
)

export const createMobxForm = (schema, value) => {
  foo(schema)
  return createForm(schema, value, {
    createStore: observable,
    mapField: observable,
    // TODO
    getErrors: (schema, value) => {
      ajv.validate(schema, removeBlanks(value))
      return _.groupBy(
        (e) => e.instancePath.replace("/", "").replaceAll("/", "."),
        ajv.errors
      )
    },
  })
}

// Produce an object that can be used as-is to update a mongo record
// https://github.com/feathersjs-ecosystem/feathers-mongodb#querying
export const getMongoPatch = (from, to) => {
  from = removeBlanks(flattenObjectNotArrays(from))
  to = removeBlanks(flattenObjectNotArrays(to))

  const [$unset, $set] = _.flow(
    F.pickByIndexed((v, k) => !_.isEqual(from[k], to[k])),
    F.mapValuesIndexed((v, k) => to[k]),
    partitionObject(_.isUndefined)
  )(_.merge(from, to))

  return _.isEmpty($unset)
    ? $set
    : { ...$set, $unset: _.mapValues(_.constant(true), $unset) }
}
