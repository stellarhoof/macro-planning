import { isPlainObject, mapValues } from "es-toolkit"
import type { JSONSchema7 } from "json-schema"

import type { ForEachNodeFn } from "./methods/forEach.ts"
import type { MapNodeFn } from "./methods/map.ts"

export const tree: Record<string, unknown> = {
  name: "The Empire Strikes Back",
  planets: ["Aldeeran", { name: "Tatooine" }],
}

export const jsonSchema: JSONSchema7 = {
  type: "object",
  properties: {
    name: { type: "string", title: "A new hope" },
    friends: {
      type: "array",
      items: { type: "string" },
    },
  },
  allOf: [{ required: ["name"] }, { required: ["friends"] }],
}

export const forEachJsonSchema: ForEachNodeFn<JSONSchema7> = (node, fn) => {
  if (isPlainObject(node.items) && !Array.isArray(node.items)) {
    fn(node.items, "items")
  }
  if (node.properties) {
    for (const [k, v] of Object.entries(node.properties)) {
      if (isPlainObject(v)) {
        fn(v, `properties/${k}`)
      }
    }
  }
  if (node.allOf) {
    node.allOf.forEach((v, k) => {
      if (isPlainObject(v)) {
        fn(v, `allOf/${k}`)
      }
    })
  }
}

export const mapJsonSchema: MapNodeFn<JSONSchema7, JSONSchema7, JSONSchema7> = (
  node,
  fn,
) => {
  const result = { ...node }
  if (isPlainObject(node.items) && !Array.isArray(node.items)) {
    result.items = fn(node.items, "items")
  }
  if (node.properties) {
    result.properties = mapValues(node.properties, (v, k) => {
      if (isPlainObject(v)) {
        return fn(v, `properties/${k}`)
      }
      return v
    })
  }
  if (node.allOf) {
    result.allOf = node.allOf.map((v, k) => {
      if (isPlainObject(v)) {
        return fn(v, `allOf/${k}`)
      }
      return v
    })
  }
  return result
}
