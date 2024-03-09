import { v } from "convex/values"

import { query } from "./_generated/server.js"

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first()
  },
})

export const getFoods = query({
  args: { userId: v.id("user") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("food")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect()
  },
})
