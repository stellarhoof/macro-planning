import _ from "lodash/fp"
import F from "futil"
import { getTemplate } from "./getTemplate.js"
import { joinPaths } from "../util/futil.js"

const mutating = _.convert({ immutable: false })

const extendProperties = (x, y) =>
  Object.defineProperties(x, Object.getOwnPropertyDescriptors(y))

export const Tree = F.tree((x) => x.fields)

const reduceFields = _.curryN(2, (fn, field) =>
  Tree.reduce((acc, field) => {
    const result = fn(field)
    if (result !== undefined) acc[field.path] = result
    return acc
  })({}, field)
)

export const getFormFields = reduceFields(_.identity)

export const getFormData = reduceFields((field) => {
  if (!field.disabled && !field.fields) return field.value
})

const createFields = (store, config, field) =>
  field.schema.type === "array"
    ? _.times(
        (name) =>
          createField(store, config, {
            schema: field.schema.items,
            parent: field,
            name,
          }),
        _.size(field.value)
      )
    : F.mapValuesIndexed(
        (schema, name) =>
          createField(store, config, { schema, parent: field, name }),
        field.schema.properties
      )

const createField = (store, config, { schema, parent, name = "" }) => {
  // State local to this field
  const state = config.createStore({
    required: _.includes(name, parent?.schema?.required),
    hidden: schema.field?.hidden,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly
    readonly: schema.field?.readonly,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
    disabled:
      schema.field?.disabled ||
      // Semantically, json-schema's readOnly is closer to HTML's disabled,
      // since json-schema readOnly values should not get sent to the server
      schema.readOnly,
  })

  let field = {
    id: _.uniqueId(),
    name,
    parent,
    get schema() {
      return schema
    },
    get path() {
      return joinPaths(parent?.path, field.name)
    },
    get value() {
      return _.get(joinPaths("value", field.path), store)
    },
    set value(x) {
      mutating.set(joinPaths("value", field.path), x, store)
    },
    get hidden() {
      return state.hidden
    },
    set hidden(x) {
      state.hidden = x
    },
    get readonly() {
      return state.readonly
    },
    set readonly(x) {
      state.readonly = x
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
    get disabled() {
      return !!((parent?.disabled || 0) + (state.disabled ? 1 : 0))
    },
    set disabled(x) {
      state.disabled = x
    },
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
  extendProperties(field, {
    get willValidate() {
      return !field.readonly && !field.hidden && !field.disabled
    },
    get validationMessage() {
      return field.willValidate ? state.validationMessage : undefined
    },
    setCustomValidity(x) {
      state.validationMessage = x
    },
    checkValidity() {
      return _.isEmpty(config.validate(schema, field.value))
    },
    // Validating a single property from a general schema is not possible in the
    // general case and it's complex in relatively simple cases
    // https://github.com/ajv-validator/ajv/issues/211#issuecomment-242997557
    reportValidity() {
      const errors = _.mapKeys(
        (k) => joinPaths(field.path, k),
        config.validate(field)
      )
      Tree.walk((f) => f.setCustomValidity(errors[f.path]))(field)
      return _.isEmpty(errors)
    },
  })

  if (schema.type === "array" || schema.type === "object") {
    extendProperties(field, {
      get fields() {
        state.fields ||= createFields(store, config, field)
        return state.fields
      },
    })
  }

  if (parent?.schema?.type === "object") {
    extendProperties(field, {
      get required() {
        return field.willValidate && state.required
      },
      set required(x) {
        state.required = x
      },
    })
  }

  if (schema.type === "array") {
    extendProperties(field, {
      get canAddField() {
        return (schema.maxItems ?? -1) < _.size(field.value)
      },
      get canRemoveField() {
        return (schema.minItems ?? Infinity) >= _.size(field.value)
      },
      addField(index) {
        index ||= _.size(field.value)
        const newValue = getTemplate(schema.items)
        const newField = createField(store, config, {
          schema: schema.items,
          parent: field,
          name: index,
        })
        field.value.splice(index, 0, newValue)
        field.fields.splice(index, 0, newField)
        for (let f of field.fields.slice(index + 1)) f.name++
      },
      removeField(index) {
        field.value.splice(index, 1)
        field.fields.splice(index, 1)
        for (let f of field.fields.slice(index)) f.name--
      },
      moveField(from, to) {
        if (from !== to) {
          field.removeField(from)
          field.addField(to)
        }
      },
    })
  }

  field = config.mapField(field)

  return field
}

const defaultConfig = {
  createStore: _.identity,
  mapField: _.identity,
  validate: _.constant({}),
}

export const createForm = (schema, value, config) =>
  createField(
    config.createStore({ value: getTemplate(schema, value) }),
    _.defaults(defaultConfig, config),
    { schema }
  )
