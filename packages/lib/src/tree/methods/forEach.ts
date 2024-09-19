import { isPlainObject } from "es-toolkit"

import { type Context, type Key, StopTraversal } from "../types.ts"

export type ForEachNodeFn<T> = (
  node: T,
  fn: (node: T, key: Key) => void,
  ctx: Context<T>,
) => void

export interface ForEachOptions<T> {
  pre?: (node: T, ctx: Context<T>) => void
  post?: (node: T, ctx: Context<T>) => void
  forEachNode?: ForEachNodeFn<T>
}

function defaultForEachNode<T>(node: T, fn: (node: T, key: Key) => void) {
  if (Array.isArray(node)) {
    node.forEach(fn)
  }
  if (isPlainObject(node)) {
    Object.entries(node).forEach(([k, v]) => {
      fn(v, k)
    })
  }
}

export function forEach<T>(
  node: T,
  { pre, post, forEachNode = defaultForEachNode }: ForEachOptions<T>,
) {
  function rec(node: T, ctx: Context<T>) {
    pre?.(node, ctx)
    forEachNode(
      node,
      (child, key) => {
        rec(child, {
          key,
          path: [...ctx.path, key],
          parents: [node, ...ctx.parents],
        })
      },
      ctx,
    )
    post?.(node, ctx)
  }
  try {
    rec(node, { path: [], parents: [] })
  } catch (e) {
    if (!(e instanceof StopTraversal)) {
      throw e
    }
  }
}
