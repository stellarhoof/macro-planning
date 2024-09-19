import { cloneDeep, isPlainObject } from "es-toolkit"
import { expect, it } from "vitest"

import { forEachJsonSchema, jsonSchema, tree } from "../test.ts"
import { forEach } from "./forEach.ts"

it("walks over simple tree in the correct order", () => {
  const cloned: Record<string, unknown> = cloneDeep(tree)

  forEach(cloned, {
    pre(node) {
      if (Array.isArray(node)) {
        node.push("[arr-pre]")
      }
      if (isPlainObject(node)) {
        node.added = `${node.added ?? ""}[obj-pre]`
      }
    },
    post(node) {
      if (Array.isArray(node)) {
        node.push("[arr-post]")
      }
      if (isPlainObject(node)) {
        node.added = `${node.added} [obj-post]`
      }
    },
  })

  expect(cloned).toEqual({
    name: "The Empire Strikes Back",
    planets: [
      "Aldeeran",
      {
        name: "Tatooine",
        added: "[obj-pre] [obj-post]",
      },
      "[arr-pre]",
      "[arr-post]",
    ],
    added: "[obj-pre] [obj-post]",
  })
})

it("walks over json schema in the correct order", () => {
  const cloned = cloneDeep(jsonSchema)

  forEach(cloned, {
    forEachNode: forEachJsonSchema,
    pre(node, ctx) {
      node.$id = `/${ctx.path.join("/")}`
    },
  })

  expect(cloned).toEqual({
    $id: "/",
    type: "object",
    properties: {
      name: {
        $id: "/properties/name",
        type: "string",
        title: "A new hope",
      },
      friends: {
        $id: "/properties/friends",
        type: "array",
        items: {
          $id: "/properties/friends/items",
          type: "string",
        },
      },
    },
    allOf: [
      { $id: "/allOf/0", required: ["name"] },
      { $id: "/allOf/1", required: ["friends"] },
    ],
  })
})
