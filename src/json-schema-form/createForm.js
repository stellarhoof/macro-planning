import _ from "lodash/fp"
import F from "futil"
import { getTemplate } from "./getTemplate.js"

const mutable = _.convert({ immutable: false })

const extend = (x, y) =>
  Object.defineProperties(x, Object.getOwnPropertyDescriptors(y))

// const shouldSkipError = (e) => {
//   const schema =
//     e.keyword === "required"
//       ? e.parentSchema.properties[e.schema.join(".")]
//       : e.parentSchema
//   // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden#validation
//   // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled#constraint_validation
//   return schema.hidden || schema.disabled
// }

const Tree = F.tree(_.get("fields"))

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly#constraint_validation
const adjustInherited = (property, value, field) => {
  if ((field.state[property] ?? false) !== value) {
    Tree.walk((field, key) => {
      if (_.isUndefined(key)) {
        field.state[property] = value
      } else {
        mutable.defaults({ inherited: { [property]: 0 } }, field.state)
        field.state.inherited[property] = value
          ? field.state.inherited[property] + 1
          : Math.max(0, field.state.inherited[property] - 1)
      }
    })(field)
  }
}

const toSchemaPath = (x) => {
  if (!x) return x
  const path = x
    .replaceAll(/\.(\d+)/g, "/items")
    .replace(/^(\d+)/, "items")
    .replaceAll(".", ".properties.")
    .replaceAll("/", ".")
  return path.startsWith("items") ? path : `properties.${path}`
}

const join = (...segments) =>
  _.filter((x) => x !== "" && !_.isNil(x), segments).join(".")

export const createForm = (
  schema,
  value,
  { mapField = _.identity, createStore = _.identity }
) => {
  const store = createStore({
    schema,
    value: getTemplate(schema, value),
    state: {},
    errors: {},
  })

  const makePaths = (path) => ({
    schema: join("schema", toSchemaPath(path)),
    value: join("value", path),
    state: ["state", path],
    errors: ["errors", path],
  })

  const createFields = (field) =>
    field.schema.type === "array"
      ? _.times(
          (i) => createField(join(field.path, i), field),
          _.size(field.value)
        )
      : F.mapValuesIndexed(
          (v, k) => createField(join(field.path, k), field),
          field.schema.properties
        )

  const createField = (path, parent) => {
    const paths = makePaths(path)

    let field = {
      path,
      // Getters
      get schema() {
        return _.get(paths.schema, store)
      },
      get errors() {
        return _.get(paths.errors, store)
      },
      get state() {
        return _.get(paths.state, store)
      },
      get value() {
        return _.get(paths.value, store)
      },
      get hidden() {
        return field.state.hidden || field.state.inherited?.hidden > 0
      },
      get disabled() {
        return field.state.disabled || field.state.inherited?.disabled > 0
      },
      // Setters
      set state(x) {
        mutable.set(paths.state, x, store)
      },
      set value(x) {
        mutable.set(paths.value, x, store)
      },
      set hidden(x) {
        adjustInherited("hidden", x, field)
      },
      set disabled(x) {
        adjustInherited("disabled", x, field)
      },
    }

    field.state ||= {}

    if (field.schema.type === "array" || field.schema.type === "object") {
      extend(field, {
        get fields() {
          field.state.fields ||= createFields(field)
          return field.state.fields
        },
      })
    }

    if (parent?.schema?.type === "object") {
      const name = _.last(path.split("."))
      extend(field, {
        get required() {
          return _.includes(name, parent.schema.required)
        },
        set required(x) {
          parent.schema.required ||= []
          if (x) parent.schema.required.push(name)
          else mutable.pull(name, parent.schema.required)
        },
      })
    }

    if (field.schema.type === "array") {
      extend(field, {
        get canAddItem() {
          return (
            !field.disabled &&
            !field.hidden &&
            (field.schema.maxItems ?? -1) < field.value.length
          )
        },
        get canRemoveItem() {
          return (
            !field.disabled &&
            !field.hidden &&
            (field.schema.minItems ?? Infinity) >= field.value.length
          )
        },
        addItem(index, item) {
          const value = getTemplate(field.schema.items, item)
          const field = createField(join(field.path, index), field)
          field.value.splice(index, 0, value)
          field.fields.splice(index, 0, field)
        },
        removeItem(index) {
          field.value.splice(index, 1)
          field.fields.splice(index, 1)
        },
      })
    }

    field = mapField(field)

    return field
  }

  return createField("")
}
