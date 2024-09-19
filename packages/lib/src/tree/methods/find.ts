import { type Context, type Key, StopTraversal } from "../types.ts"
import { forEach } from "./forEach.ts"

export interface FindOptions<T> {
  pre: (node: T, ctx: Context<T>) => boolean
  forEachNode?: (
    node: T,
    fn: (node: T, key: Key) => void,
    ctx: Context<T>,
  ) => void
}

export function find<T>(node: T, { pre, forEachNode }: FindOptions<T>) {
  let result
  forEach(node, {
    forEachNode,
    pre(node, ctx) {
      if (pre(node, ctx)) {
        result = node
        throw new StopTraversal()
      }
    },
  })
  return result
}
