import { parseArgs } from "node:util"

import { prisma } from "#prisma/client.js"

import {
  seedFoods,
  seedMealRecipes,
  seedMeals,
  seedPlans,
  seedRecipeFoods,
  seedRecipes,
  seedUsers,
} from "../models/food.js"
import common from "./common.json"
import development from "./development.json"

try {
  const users = await seedUsers(common.users)
  const admin = users[0]!
  const foods = await seedFoods(admin, common.foods)
  const args = parseArgs({ options: { environment: { type: "string" } } })

  if (args.values.environment === "development") {
    // Entities
    const recipes = await seedRecipes(
      admin,
      development.recipes.map((recipe) => ({
        ...recipe,
        steps: JSON.stringify(recipe.steps),
      })),
    )
    const meals = await seedMeals(admin, development.meals)
    await seedPlans(admin, development.plans)

    // Relationships
    await seedRecipeFoods(recipes, foods)
    await seedMealRecipes(meals, recipes)
  }
} catch (e) {
  console.error(e)
} finally {
  await prisma.$disconnect()
}
