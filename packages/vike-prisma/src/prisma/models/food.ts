import type { Food, Meal, Plan, Recipe, User } from "@prisma/client"

import { prisma } from "../client.js"

function getNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export async function seedUsers(
  users: Omit<User, "id" | "createdAt" | "updatedAt">[],
) {
  const result = []
  for (const { email, ...update } of users) {
    result.push(
      await prisma.user.upsert({
        where: { email },
        update,
        create: { email, ...update },
      }),
    )
  }
  return result
}

export async function seedPlans(
  user: User,
  plans: Omit<Plan, "id" | "createdAt" | "updatedAt" | "userId">[],
) {
  const result = []
  for (const { name, ...update } of plans) {
    result.push(
      await prisma.plan.upsert({
        where: { userId_name: { userId: user.id, name } },
        update,
        create: { userId: user.id, name, ...update },
      }),
    )
  }
  return result
}

export async function seedFoods(
  user: User,
  foods: Omit<Food, "id" | "createdAt" | "updatedAt" | "userId">[],
) {
  const result = []
  for (const { name, ...update } of foods) {
    result.push(
      await prisma.food.upsert({
        where: { userId_name: { userId: user.id, name } },
        update,
        create: { userId: user.id, name, ...update },
      }),
    )
  }
  return result
}

export async function seedRecipes(
  user: User,
  recipes: Omit<Recipe, "id" | "createdAt" | "updatedAt" | "userId">[],
) {
  const result = []
  for (const { name, ...update } of recipes) {
    result.push(
      await prisma.recipe.upsert({
        where: { userId_name: { userId: user.id, name } },
        update,
        create: { userId: user.id, name, ...update },
      }),
    )
  }
  return result
}

export async function seedMeals(
  user: User,
  meals: Omit<Meal, "id" | "createdAt" | "updatedAt" | "userId">[],
) {
  const result = []
  for (const { name, ...update } of meals) {
    result.push(
      await prisma.meal.upsert({
        where: { userId_name: { userId: user.id, name } },
        update,
        create: { userId: user.id, name, ...update },
      }),
    )
  }
  return result
}

export async function seedRecipeFoods(recipes: Recipe[], foods: Food[]) {
  const result = []
  for (const recipe of recipes) {
    for (const food of foods) {
      result.push(
        await prisma.recipeFood.upsert({
          where: { recipeId_foodId: { recipeId: recipe.id, foodId: food.id } },
          update: {},
          create: {
            recipeId: recipe.id,
            foodId: food.id,
            amount: getNumberInRange(50, 150),
          },
        }),
      )
    }
  }
  return result
}

export async function seedMealRecipes(meals: Meal[], recipes: Recipe[]) {
  const result = []
  for (const meal of meals) {
    for (const recipe of recipes) {
      result.push(
        await prisma.mealRecipe.upsert({
          where: { mealId_recipeId: { mealId: meal.id, recipeId: recipe.id } },
          update: {},
          create: {
            mealId: meal.id,
            recipeId: recipe.id,
          },
        }),
      )
    }
  }
  return result
}
