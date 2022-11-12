import _ from "lodash/fp.js"
import F from "futil"

export const compactDotJoin = (...args) => _.remove(_.isNil, args).join(".")

export const partitionObject = _.curryN(2, (predicate, obj) => [
  _.pickBy(predicate, obj),
  _.pickBy(_.negate(predicate), obj),
])

// Same as futil's that allows its first argument to be:
// 1. A function that is executed post-order.
// 2. A { pre, post } object.
export const walk =
  (next = F.traverse) =>
  (fns, parents = [], parentIndexes = []) => {
    const { pre = _.noop, post = _.noop } = _.isFunction(fns)
      ? { post: fns }
      : fns
    return (tree, index) =>
      pre(tree, index, parents, parentIndexes) ||
      F.findIndexed(
        walk(next)(fns, [tree, ...parents], [index, ...parentIndexes]),
        next(tree, index, parents, parentIndexes) || []
      ) ||
      post(tree, index, parents, parentIndexes)
  }

// Same as futil's but uses the above walk
export const transformTree = (next = F.traverse) =>
  _.curry((f, x) => {
    const result = _.cloneDeep(x)
    walk(next)(f)(result)
    return result
  })

// Same as futil's but checks if parent exists before writing to it.
const writeProperty =
  (next = F.traverse) =>
  (node, index, [parent]) => {
    if (parent) next(parent)[index] = node
  }

const deleteProperty =
  (next = F.traverse) =>
  (node, index, [parent]) => {
    if (parent) delete next(parent)[index]
  }

export const filterTree = (
  next = F.traverse,
  writeNode = writeProperty(next),
  deleteNode = deleteProperty(next)
) =>
  _.curry((filter, tree) =>
    transformTree(next)((node, ...args) => {
      // When an element gets deleted from an array, it simply gets replaced
      // by `undefined` so we have to remove them manually.
      if (_.isArray(node)) {
        node = _.remove(_.isUndefined, node)
        writeNode(node, ...args)
      }
      if (!filter(node, ...args)) deleteNode(node, ...args)
    })(tree)
  )

export const buildPath = (n, i, p, pi) =>
  _.isUndefined(i) ? "" : [..._.reverse(_.dropLast(1, pi)), i].join(".")

export const joinPaths = (...segments) =>
  _.filter((x) => x !== "" && !_.isNil(x), segments).join(".")

export const flattenObjectNotArrays = (value) =>
  !_.isPlainObject(value)
    ? value
    : F.reduceTree((x) => _.isPlainObject(x) && x)(
        (acc, value, key, ...args) => {
          if (_.isUndefined(key)) return acc
          if (_.isPlainObject(value)) return acc
          const path = buildPath(value, key, ...args)
          acc[path] = _.isArray(value)
            ? _.map(flattenObjectNotArrays, value)
            : value
          return acc
        },
        {},
        value
      )

export const removeBlanks = filterTree()(F.isNotBlank)

export const removeBlankLeaves = filterTree()(
  (x) => _.isArray(x) || _.isPlainObject(x) || F.isNotBlank(x)
)
