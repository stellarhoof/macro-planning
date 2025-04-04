import type { AnyFieldApi, AnyFormApi } from "@tanstack/react-form"
import { startCase } from "es-toolkit"
import { get } from "es-toolkit/compat"
import type {
  JSONSchema7 as JSONSchema,
  JSONSchema7TypeName,
} from "json-schema"

// TODO: Create test
// foo.bar -> properties.foo.properties.bar
// [0] -> items
// [0].bar -> items.properties.bar
// foo[0] -> properties.foo.items
// foo[0].bar -> properties.foo.items.properties.bar
export function getSchema(path: string, jsonSchema: JSONSchema): JSONSchema {
  if (path === "") {
    return jsonSchema
  }
  const schema = get(
    jsonSchema,
    path
      .replaceAll(/([a-zA-Z_]+)/g, "properties.$1")
      .replaceAll(/(\w)\[\d\]/g, "$1.items")
      .replace(/^\[\d\]/, "items"),
  )
  if (!schema) {
    throw new Error(`No schema found at path "${path}"`)
  }
  return schema
}

export function getFormSchema(form: AnyFormApi): JSONSchema {
  const formSchema = form.options.onSubmitMeta.jsonSchema
  if (!formSchema) {
    throw new Error("JSON schema not provided in `onSubmitMeta`")
  }
  return formSchema
}

export function getFieldSchema(
  field: AnyFieldApi,
  types?: JSONSchema7TypeName[],
): JSONSchema {
  const formSchema = getFormSchema(field.form)
  const fieldSchema = getSchema(field.name, formSchema)
  if (types?.length) {
    if (!types?.some((type) => fieldSchema.type === type)) {
      throw new Error(
        `JSON schema type at path "${field.name}" should be "${types.join(", ")}"`,
      )
    }
  }
  return fieldSchema
}

export function isArraySchema(
  schema: object,
): schema is { type: "array"; items: object } {
  return (
    "type" in schema &&
    "items" in schema &&
    schema.type === "array" &&
    schema.items !== null &&
    typeof schema.items === "object"
  )
}

export function schemaHasEnum(
  schema: object,
): schema is { type: "string" | "number"; enum: (string | number)[] } {
  return (
    "type" in schema &&
    "enum" in schema &&
    Array.isArray(schema.enum) &&
    (schema.type === "string" || schema.type === "number")
  )
}

export interface SelectionItem {
  id: string | number
  label: string
}

export function getSelectionItems(schema: JSONSchema): SelectionItem[] {
  if (schemaHasEnum(schema)) {
    return schema.enum.map((id) => ({ id, label: startCase(id.toString()) }))
  }
  if (isArraySchema(schema)) {
    return getSelectionItems(schema.items)
  }
  return []
}

export type OmittedFieldProps =
  // Validation is handled by Tanstack form.
  | "validate"
  // Tanstack form does not have a dedicated flag to indicate required fields.
  | "isRequired"
  // We are not using native validation and `validationBehavior: "aria"` is
  // only used to set `aria-required` which we're not using since `isRequired`
  // is being omitted.
  | "validationBehavior"
  // Managed by Tanstack form.
  | keyof ReturnType<typeof commonFieldProps>

export function commonFieldProps(field: AnyFieldApi) {
  return {
    name: field.name,
    onBlur: field.handleBlur,
    isInvalid: field.state.meta.errors.length > 0,
    errorMessage: field.state.meta.errors.join(", "),
  }
}
