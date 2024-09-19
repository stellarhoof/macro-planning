import { isPlainObject, pickBy } from "es-toolkit"

import type { Context, Key } from "../types.ts"
import { defaultMapNode } from "./map.ts"

const PRUNE = Symbol("PRUNE")

export interface FilterOptions<T> {
  pre?: (node: T, ctx: Context<T>) => boolean
  post?: (node: T, ctx: Context<T>) => boolean
  mapNode?: (
    node: T,
    fn: (node: T, key: Key) => T | typeof PRUNE,
    ctx: Context<T>,
  ) => T
  filterNode?: (
    node: T,
    fn: (node: T, key: Key) => boolean,
    ctx: Context<T>,
  ) => T
}

function defaultFilterNode<T>(node: T, fn: (node: T, key: Key) => boolean) {
  if (Array.isArray(node)) {
    return node.filter(fn) as T
  }
  if (isPlainObject(node)) {
    // @ts-expect-error: Symbol
    return pickBy(node, fn) as T
  }
  return node
}

export function filter<T>(
  node: T,
  {
    pre = () => true,
    post = () => true,
    mapNode = defaultMapNode,
    filterNode = defaultFilterNode,
  }: FilterOptions<T>,
) {
  function rec(node: T, ctx: Context<T>) {
    if (!pre(node, ctx)) {
      return PRUNE
    }
    const mappedResult = mapNode(
      node,
      (child, key) => {
        return rec(child, {
          key,
          path: [...ctx.path, key],
          parents: [node, ...ctx.parents],
        })
      },
      ctx,
    )
    const filteredResult = filterNode(
      mappedResult,
      (child) => child !== PRUNE,
      ctx,
    )
    if (!post(filteredResult, ctx)) {
      return PRUNE
    }
    return filteredResult
  }

  const result = rec(node, { path: [], parents: [] })

  return result === PRUNE ? undefined : result
}
