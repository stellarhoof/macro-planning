import { expect, it } from "vitest"

import { forEachJsonSchema, jsonSchema, tree } from "../test.ts"
import type { Key } from "../types.ts"
import { reduce } from "./reduce.ts"

it("pre tree", () => {
  const init: Key[][] = []

  const result = reduce(tree, init, {
    pre(acc, _node, ctx) {
      return [...acc, ctx.path]
    },
  })

  expect(result).toEqual([
    [],
    ["name"],
    ["planets"],
    ["planets", 0],
    ["planets", 1],
    ["planets", 1, "name"],
  ])
})

it("post tree", () => {
  const init: Key[][] = []

  const result = reduce(tree, init, {
    post(acc, _node, ctx) {
      return [...acc, ctx.path]
    },
  })

  expect(result).toEqual([
    ["name"],
    ["planets", 0],
    ["planets", 1, "name"],
    ["planets", 1],
    ["planets"],
    [],
  ])
})

it("pre json schema", () => {
  const init: Key[][] = []

  const result = reduce(jsonSchema, init, {
    forEachNode: forEachJsonSchema,
    pre(acc, _node, ctx) {
      return [...acc, ctx.path]
    },
  })

  expect(result).toEqual([
    [],
    ["properties/name"],
    ["properties/friends"],
    ["properties/friends", "items"],
    ["allOf/0"],
    ["allOf/1"],
  ])
})

it("post json schema", () => {
  const init: Key[][] = []

  const result = reduce(jsonSchema, init, {
    forEachNode: forEachJsonSchema,
    post(acc, _node, ctx) {
      return [...acc, ctx.path]
    },
  })

  expect(result).toEqual([
    ["properties/name"],
    ["properties/friends", "items"],
    ["properties/friends"],
    ["allOf/0"],
    ["allOf/1"],
    [],
  ])
})
