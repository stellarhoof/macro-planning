import _ from "lodash/fp.js"
import F from "futil"
import { Tree, fillDefaultValues as addDefaultValues } from "./schemaUtils.js"
import { joinPaths } from "../util/futil.js"

const mut = _.convert({ immutable: false })

const formTree = F.tree((schema) => schema.properties || schema.field?.items)

const reduceSchema = _.curryN(2, (fn, schema) =>
  formTree.reduce((acc, schema) => {
    const result = fn(schema)
    if (result !== undefined) acc[schema.field.path] = result
    return acc
  })({}, schema)
)

export const getFlatSchema = reduceSchema(_.identity)

export const getFlatSchemaValue = reduceSchema((schema) => {
  if (!schema.field.disabled && !schema.properties && !schema.items)
    return schema.field.value
})

const extendProperties = (x, y) =>
  Object.defineProperties(x, Object.getOwnPropertyDescriptors(y))

export const toJsonSchema = (schema, { fromStore = _.cloneDeep } = {}) => {
  schema = fromStore(schema)
  Tree.walk((schema) => {
    delete schema.field
    delete schema.items?.field
  })(schema)
  return schema
}

// This library does not know anything about ajv or mobx
// Steps:
// 1. Make store with default values filled from the schema
// 2. Make store from schema
export const fromJsonSchema = (
  schema,
  {
    value = {},
    validate = _.constant({}),
    toStore = _.cloneDeep,
    fromStore = _.cloneDeep,
    extendStore = extendProperties,
  } = {}
) => {
  value = toStore({ __root__: addDefaultValues(schema, value) })
  schema = toStore(schema)

  const addFieldsToSchema = (schema, parentSchema, name = "") => {
    schema.field ||= {}

    extendStore(schema.field, {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
      // Semantically, json-schema's readOnly is closer to HTML's disabled,
      // since json-schema readOnly values should not get sent to the server
      __disabled: !!schema.readOnly,
      id: _.uniqueId(),
      name,
      schema,
      parentSchema,
      get path() {
        return joinPaths(parentSchema?.field?.path, name)
      },
      get value() {
        return _.get(joinPaths("__root__", schema.field.path), value)
      },
      set value(x) {
        mut.set(joinPaths("__root__", schema.field.path), x, value)
      },
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
      get disabled() {
        return !!(
          (parentSchema?.field?.disabled || 0) +
          (schema.field.__disabled ? 1 : 0)
        )
      },
      set disabled(x) {
        schema.field.__disabled = x
      },
      // Inspired by https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
      // Whether the field will be validated when the form is submitted
      get willValidate() {
        return (
          !schema.field.readonly &&
          !schema.field.hidden &&
          !schema.field.disabled
        )
      },
      // Message describing the validation constraints that the field doesn't
      // satisfy (if any). If the field is not a candidate for constraint
      // validation (willValidate is false) or the element's value satisfies its
      // constraints (is valid), return an empty string.
      get validationMessage() {
        return schema.field.willValidate
          ? schema.field.__validationMessage
          : undefined
      },
      // Add a custom error message to the field; if a custom error message is
      // set, the field is considered to be invalid, and the specified error
      // should be displayed in the UI.
      setCustomValidity(x) {
        schema.field.__validationMessage = x
      },
      // Returns true if the field's value has no validity problems; false
      // otherwise.
      checkValidity() {
        return _.isEmpty(validate(schema))
      },
      // Under the constraint validation API, this method reports invalid field(s)
      // using events. Here, we simply call setCustomValidity and assume the
      // errors will be displayed in the UI.
      reportValidity() {
        const errors = _.mapKeys(
          (k) => joinPaths(schema.field.path, k),
          // Validating a single property from a general schema is not possible in
          // the general case and it's complex in relatively simple cases
          // https://github.com/ajv-validator/ajv/issues/211#issuecomment-242997557
          validate(schema)
        )
        formTree.walk((schema) => {
          schema.field.setCustomValidity(errors[schema.field.path])
        })(schema)
        return _.isEmpty(errors)
      },
    })

    if (parentSchema?.type === "object") {
      extendStore(schema.field, {
        get required() {
          return (
            schema.field.willValidate &&
            _.includes(name, parentSchema?.required)
          )
        },
        set required(x) {
          let fn = x ? _.union : _.difference
          parentSchema.required = fn(parentSchema.required, [schema.field.name])
        },
      })
    }

    if (schema.type === "object") {
      for (const [name, child] of _.toPairs(schema.properties)) {
        addFieldsToSchema(child, schema, name)
      }
    }

    if (schema.type === "array") {
      let makeItem = (index) => {
        const child = fromStore(schema.items)
        addFieldsToSchema(child, schema, index)
        return child
      }

      extendStore(schema.field, {
        items: _.times(makeItem, _.size(schema.field.value)),
        get canAddItem() {
          return (schema.maxItems ?? -1) < _.size(schema.field.value)
        },
        get canRemoveItem() {
          return (schema.minItems ?? Infinity) >= _.size(schema.field.value)
        },
        addItem(index) {
          index ||= _.size(schema.field.value)
          schema.field.items.splice(index, 0, makeItem(index))
          schema.field.value.splice(index, 0, addDefaultValues(schema.items))
          for (const item of schema.field.items.slice(index + 1))
            item.field.name++
        },
        removeItem(index) {
          schema.field.items.splice(index, 1)
          schema.field.value.splice(index, 1)
          for (const item of schema.field.items.slice(index)) item.field.name--
        },
      })
    }
  }

  addFieldsToSchema(schema)

  return schema
}
