import { expect, it } from "vitest"

import { filter } from "./filter.ts"

it("should return empty when root node is filtered out", () => {
  expect(filter("root", { pre: (x) => !x })).toEqual(undefined)
  expect(filter({}, { pre: (x) => !x })).toEqual(undefined)
})

it("should return root node when root node is not filtered out", () => {
  expect(filter("root", { pre: (x) => !!x })).toEqual("root")
  expect(filter({}, { pre: (x) => !!x })).toEqual({})
})

it("should filter out nested collection before traversing into it", () => {
  const result = filter(
    { a: "a", b: ["a", "b"] },
    {
      pre(node) {
        return !Array.isArray(node)
      },
    },
  )
  expect(result).toEqual({ a: "a" })
})

it("should filter out value inside nested collection", () => {
  const result = filter(
    { a: "a", b: ["a", "b"] },
    {
      pre(node) {
        if (typeof node === "string") return node !== "b"
        if (Array.isArray(node)) return node.length !== 0
        return node !== undefined
      },
    },
  )
  expect(result).toEqual({ a: "a", b: ["a"] })
})

it("should filter out empty values and leave empty collections in pre-order traversal", () => {
  const result = filter(
    { a: "a", b: ["b", "b"] },
    {
      pre(node) {
        if (typeof node === "string") return node !== "b"
        if (Array.isArray(node)) return node.length !== 0
        return node !== undefined
      },
    },
  )
  expect(result).toEqual({ a: "a", b: [] })
})

it("should filter out empty values and collections in post-order traversal", () => {
  const result = filter(
    { a: "a", b: ["b", "b"] },
    {
      post(node) {
        if (typeof node === "string") return node !== "b"
        if (Array.isArray(node)) return node.length !== 0
        return node !== undefined
      },
    },
  )
  expect(result).toEqual({ a: "a" })
})
