import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  user: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),

  food: defineTable({
    userId: v.id("user"),
    name: v.string(),
    brand: v.optional(v.string()),
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
    // Computed
    calories: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_name", ["name"])
    .index("by_brand", ["brand"])
    .index("by_fats", ["fats"])
    .index("by_carbs", ["carbs"])
    .index("by_proteins", ["proteins"])
    .index("by_calories", ["calories"]),

  // Recipe <-> food relationship
  recipeFood: defineTable({
    recipeId: v.id("recipe"),
    foodId: v.id("food"),
    grams: v.number(),
    // Computed
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
    calories: v.number(),
  })
    .index("recipeId", ["recipeId"])
    .index("foodId", ["foodId"]),

  recipe: defineTable({
    userId: v.id("user"),
    name: v.string(),
    steps: v.array(v.string()),
    // Computed
    grams: v.number(),
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
    calories: v.number(),
  }).index("userId", ["userId"]),

  // Meal <-> recipe relationship
  mealRecipe: defineTable({
    mealId: v.id("meal"),
    recipeId: v.id("recipe"),
  })
    .index("mealId", ["mealId"])
    .index("recipeId", ["recipeId"]),

  mealFood: defineTable({
    mealId: v.id("meal"),
    foodId: v.id("food"),
    grams: v.number(),
    // Computed
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
    calories: v.number(),
  })
    .index("mealId", ["mealId"])
    .index("foodId", ["foodId"]),

  meal: defineTable({
    userId: v.id("user"),
    name: v.string(),
    // Computed
    grams: v.number(),
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
    calories: v.number(),
  }).index("userId", ["userId"]),

  plan: defineTable({
    userId: v.id("user"),
    name: v.string(),
    fats: v.number(),
    carbs: v.number(),
    proteins: v.number(),
  }).index("userId", ["userId"]),
})
