import { expect, it } from "vitest"

import { forEachJsonSchema, jsonSchema, tree } from "../test.ts"
import { find } from "./find.ts"

it("tree should return undefined given no node found", () => {
  const node = find(tree, { pre: () => false })
  expect(node).toEqual(undefined)
})

it("tree should return nested node/path given function predicate", () => {
  const node = find(tree, {
    pre(node) {
      return typeof node === "string" && node === "Tatooine"
    },
  })
  expect(node).toEqual("Tatooine")
})

it("json schema should return undefined given no node found", () => {
  const node = find(jsonSchema, {
    forEachNode: forEachJsonSchema,
    pre() {
      return false
    },
  })
  expect(node).toEqual(undefined)
})

it("json schema should find nested node/path given function predicate", () => {
  const node = find(jsonSchema, {
    forEachNode: forEachJsonSchema,
    pre(_node, { key }) {
      return key === "properties/name"
    },
  })
  expect(node).toEqual({
    type: "string",
    title: "A new hope",
  })
})
