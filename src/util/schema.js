import _ from "lodash/fp"
import F from "futil"
import Ajv from "ajv"
import { observable } from "mobx"
import { createForm } from "../json-schema-form/index.js"
import { controls } from "../components/form/controls/index.js"
import {
  buildPath,
  removeBlanks,
  removeBlankLeaves,
  flattenObjectNotArrays,
  partitionObject,
} from "../util/futil.js"
import { DefaultFormLayout } from "../components/form/layouts/DefaultFormLayout"
import { DefaultFieldLayout } from "../components/form/layouts/DefaultFieldLayout"

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
//       mutate?.(...args)
//     } else {
//       removeSchemaFromParent(...args)
//     }
//   })(cloned)

//   return cloned
// }

export const Tree = F.tree(
  (x) => x.properties || (x.items && { items: x.items })
)

export const setSchemaDefaults = Tree.walk(
  (schema, name, parents, parentsKeys) => {
    const parent = _.head(parents)

    // Set default title
    if (_.isUndefined(schema.title) && parent?.type !== "array")
      schema.title = _.startCase(name)

    schema.control ||= {}
    schema.control.component ||=
      controls[(_.isArray(schema.enum) && "enum") || schema.type]

    if (!schema.control.component) {
      const path = buildPath(schema, name, parents, parentsKeys)
      throw new Error(`No component for field at path "${buildPath(path)}"`)
    }

    schema.layout ||= {}
    if (_.isUndefined(name)) {
      schema.layout.component ||= DefaultFormLayout
    } else {
      schema.layout.component ||= DefaultFieldLayout
      if (schema.type === "array" || schema.type === "object") {
        schema.layout.props ||= {}
        schema.layout.props.as = "fieldset"
      }
    }
  }
)
