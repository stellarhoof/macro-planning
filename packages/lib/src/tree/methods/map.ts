import { isPlainObject, mapValues } from "es-toolkit"

import type { Context, Key } from "../types.ts"

export type MapNodeFn<T, PreT, PostT> = (
  node: PreT,
  fn: (node: T, key: Key) => PostT,
  ctx: Context<PreT>,
) => PreT

export interface MapOptions<T, PreT, PostT> {
  pre?: (node: T, ctx: Context<PreT>) => PreT
  post?: (node: PreT, ctx: Context<PreT>) => PostT
  mapNode?: MapNodeFn<T, PreT, PostT>
}

export function defaultMapNode<T, PreT, PostT>(
  node: PreT,
  fn: (node: T, key: Key) => PostT,
) {
  if (Array.isArray(node)) {
    return node.map(fn) as PreT
  }
  if (isPlainObject(node)) {
    return mapValues(node, fn) as PreT
  }
  return node as unknown as PreT
}

export function map<T, PreT, PostT>(
  node: T,
  {
    pre = (node) => node as unknown as PreT,
    post = (node) => node as unknown as PostT,
    mapNode = defaultMapNode,
  }: MapOptions<T, PreT, PostT>,
) {
  function rec(node: T, ctx: Context<PreT>) {
    const preResult = pre(node, ctx)
    const mapResult = mapNode(
      preResult,
      (child, key) => {
        return rec(child, {
          key,
          path: [...ctx.path, key],
          parents: [preResult, ...ctx.parents],
        })
      },
      ctx,
    )
    const postResult = post(mapResult, ctx)
    return postResult
  }
  return rec(node, { path: [], parents: [] })
}
