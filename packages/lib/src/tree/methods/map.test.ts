import { isPlainObject, isString } from "es-toolkit"
import { expect, it } from "vitest"

import { jsonSchema, mapJsonSchema, tree } from "../test.ts"
import { map } from "./map.ts"

it("maps over simple tree in the correct order", () => {
  const result = map(tree, {
    pre(node) {
      if (isString(node)) {
        return `${node} [str-pre]`
      }
      if (Array.isArray(node)) {
        return [...node, "[arr-pre]"]
      }
      if (isPlainObject(node)) {
        return { ...node, added: `${node.added ?? ""}[obj-pre]` }
      }
      return node
    },
    post(node) {
      if (isString(node)) {
        return `${node} [str-post]`
      }
      if (Array.isArray(node)) {
        return [...node, "[arr-post]"]
      }
      if (isPlainObject(node)) {
        return { ...node, added: `${node.added} [obj-post]` }
      }
      return node
    },
  })

  expect(result).toEqual({
    name: "The Empire Strikes Back [str-pre] [str-post]",
    planets: [
      "Aldeeran [str-pre] [str-post]",
      {
        name: "Tatooine [str-pre] [str-post]",
        added: "[obj-pre] [str-pre] [str-post] [obj-post]",
      },
      "[arr-pre] [str-pre] [str-post]",
      "[arr-post]",
    ],
    added: "[obj-pre] [str-pre] [str-post] [obj-post]",
  })
})

it("maps over json schema in the correct order", () => {
  const result = map(jsonSchema, {
    mapNode: mapJsonSchema,
    pre(node, ctx) {
      return { ...node, pointer: `/${ctx.path.join("/")}` }
    },
  })

  expect(result).toEqual({
    type: "object",
    pointer: "/",
    properties: {
      name: {
        type: "string",
        title: "A new hope",
        pointer: "/properties/name",
      },
      friends: {
        type: "array",
        pointer: "/properties/friends",
        items: {
          type: "string",
          pointer: "/properties/friends/items",
        },
      },
    },
    allOf: [
      { required: ["name"], pointer: "/allOf/0" },
      { required: ["friends"], pointer: "/allOf/1" },
    ],
  })
})
