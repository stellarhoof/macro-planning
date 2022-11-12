import _ from "lodash/fp"
import F from "futil"
import { getTemplate } from "./getTemplate.js"
import { joinPaths, buildPath } from "../util/futil.js"

const mutating = _.convert({ immutable: false })

const extend = (x, y) =>
  Object.defineProperties(x, Object.getOwnPropertyDescriptors(y))

const Tree = F.tree((x) => x.fields)

const setErrors = (errors) =>
  Tree.walk((field, ...args) => {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden#validation
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled#constraint_validation
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly#constraint_validation
    const skipError = field.schema.readOnly || field.hidden || field.disabled
    field.state.errors = skipError ? [] : errors[buildPath(field, ...args)]
  })

const setFlagRecursively = (property, value) =>
  Tree.walk((field, key) => {
    if (_.isUndefined(key)) {
      field.state[property] = value
    } else {
      mutating.update(
        `inherited.${property}`,
        (count = 0) => Math.max(0, value ? count + 1 : count - 1),
        field.state
      )
    }
  })

const toSchemaPath = (x) => {
  if (!x) return x
  const path = x
    .replaceAll(/\.(\d+)/g, "/items")
    .replace(/^(\d+)/, "items")
    .replaceAll(".", ".properties.")
    .replaceAll("/", ".")
  return path.startsWith("items") ? path : `properties.${path}`
}

export const createForm = (schema, value, options) => {
  const {
    createStore = _.identity,
    mapField = _.identity,
    getErrors = _.constant({}),
  } = options

  const store = createStore({ schema, value: getTemplate(schema, value) })

  const createFields = (parent) =>
    parent.schema.type === "array"
      ? _.times((i) => createField(parent, i), _.size(parent.value))
      : F.mapValuesIndexed(
          (v, k) => createField(parent, k),
          parent.schema.properties
        )

  const createField = (parent, key = "") => {
    let field = {
      id: _.uniqueId(),
      state: createStore({}),
      key,
      get path() {
        return joinPaths(parent?.path, field.key)
      },
      get schemaPath() {
        return toSchemaPath(field.path)
      },
      // Getters
      get errors() {
        return field.state.errors
      },
      get schema() {
        return _.get(joinPaths("schema", field.schemaPath), store)
      },
      get value() {
        return _.get(joinPaths("value", field.path), store)
      },
      set value(x) {
        mutating.set(joinPaths("value", field.path), x, store)
      },
      get hidden() {
        return field.state.hidden || field.state.inherited?.hidden > 0
      },
      set hidden(x) {
        if ((field.state.hidden ?? false) !== x) {
          setFlagRecursively("hidden", x)(field)
        }
      },
      get disabled() {
        return field.state.disabled || field.state.inherited?.disabled > 0
      },
      set disabled(x) {
        if ((field.state.disabled ?? false) !== x) {
          setFlagRecursively("disabled", x)(field)
        }
      },
      validate() {
        setErrors(getErrors(field.schema, field.value))(field)
      },
    }

    if (field.schema.type === "array" || field.schema.type === "object") {
      extend(field, {
        get fields() {
          field.state.fields ||= createFields(field)
          return field.state.fields
        },
      })
    }

    if (parent?.schema?.type === "object") {
      extend(field, {
        get required() {
          return _.includes(field.key, parent.schema.required)
        },
        set required(x) {
          parent.schema.required ||= []
          if (x) parent.schema.required.push(field.key)
          else mutating.pull(field.key, parent.schema.required)
        },
      })
    }

    if (field.schema.type === "array") {
      extend(field, {
        get canAddField() {
          return (field.schema.maxItems ?? -1) < _.size(field.value)
        },
        get canRemoveField() {
          return (field.schema.minItems ?? Infinity) >= _.size(field.value)
        },
        addField(index) {
          index ||= _.size(field.value)
          field.value.splice(index, 0, getTemplate(field.schema.items))
          field.fields.splice(index, 0, createField(field, index))
          for (let f of field.fields.slice(index + 1)) f.key++
        },
        removeField(index) {
          field.value.splice(index, 1)
          field.fields.splice(index, 1)
          for (let f of field.fields.slice(index)) f.key--
        },
        moveField(from, to) {
          field.removeField(from)
          field.addField(to)
        },
      })
    }

    field = mapField(field)

    return field
  }

  return createField()
}
