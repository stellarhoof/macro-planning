import { cloneDeep } from "es-toolkit"

import type { Context } from "../types.ts"
import { type ForEachNodeFn, forEach } from "./forEach.ts"

export interface ReduceOptions<T, R> {
  pre?: (result: R, node: T, ctx: Context<T>) => R
  post?: (result: R, node: T, ctx: Context<T>) => R
  forEachNode?: ForEachNodeFn<T>
}

export function reduce<T, R>(
  node: T,
  initialValue: R,
  { pre, post, forEachNode }: ReduceOptions<T, R>,
) {
  let result = cloneDeep(initialValue)
  forEach(node, {
    forEachNode,
    pre: pre ? (node, ctx) => (result = pre(result, node, ctx)) : undefined,
    post: post ? (node, ctx) => (result = post(result, node, ctx)) : undefined,
  })
  return result
}
