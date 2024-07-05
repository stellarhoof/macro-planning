import { v } from "convex/values"
import * as _ from "radashi"

import type { IndexNames } from "convex/server"
import type { DataModel } from "./_generated/dataModel.js"
import { query } from "./_generated/server.js"
import { tables } from "./tables.js"

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first()
  },
})

const fieldToIndex = _.mapValues(
  Object.groupBy(tables.food.indexes, (index) => index.fields[0] ?? ""),
  (indexes) => indexes?.[0]?.indexDescriptor ?? "",
)

export const getFoods = query({
  args: {
    userId: v.id("user"),
    orderField: v.optional(v.string()),
    orderDirection: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const filtered = ctx.db
      .query("food")
      .filter((q) => q.eq(q.field("userId"), args.userId))
    if (args.orderField && args.orderField in fieldToIndex) {
      const index = fieldToIndex[args.orderField] as IndexNames<
        DataModel["food"]
      >
      return await filtered
        .withIndex(index)
        .order(args.orderDirection ?? "asc")
        .collect()
    }
    return await filtered.collect()
  },
})
