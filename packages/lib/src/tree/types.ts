export class StopTraversal extends Error {}

export type Key = string | number

export interface Context<T> {
  key?: Key
  path: Key[]
  parents: T[]
}
