import { computed } from "mobx"
import {
  Model,
  type ModelData,
  type Ref,
  idProp,
  model,
  prop,
  rootRef,
} from "mobx-keystone"

export type Macro = "carbs" | "proteins" | "fats"

@model("Food")
export class Food extends Model({
  id: idProp,
  name: prop<string>(),
  brand: prop<string>(),
  carbs: prop<number>(),
  proteins: prop<number>(),
  fats: prop<number>(),
}) {}

export type TFood = ModelData<Food>

export const foodRef = rootRef<Food>("foodRef")

@model("FoodAmount")
export class FoodAmount extends Model({
  food: prop<Ref<Food>>(),
  amount: prop<number>(),
}) {
  getMacro(macro: Macro) {
    return Math.round(this.food.current[macro] * (this.amount / 100))
  }
  @computed
  get carbs() {
    return this.getMacro("carbs")
  }
  @computed
  get proteins() {
    return this.getMacro("proteins")
  }
  @computed
  get fats() {
    return this.getMacro("fats")
  }
  @computed
  get calories() {
    return this.carbs * 4 + this.proteins * 4 + this.fats * 9
  }
}

@model("Recipe")
export class Recipe extends Model({
  id: idProp,
  name: prop<string>(),
  steps: prop<string[]>(),
  foodAmounts: prop<FoodAmount[]>(),
}) {
  @computed
  get carbs() {
    return this.foodAmounts.reduce((sum, x) => sum + x.carbs, 0)
  }
  @computed
  get proteins() {
    return this.foodAmounts.reduce((sum, x) => sum + x.proteins, 0)
  }
  @computed
  get fats() {
    return this.foodAmounts.reduce((sum, x) => sum + x.fats, 0)
  }
  @computed
  get calories() {
    return this.foodAmounts.reduce((sum, x) => sum + x.calories, 0)
  }
  @computed
  get amount() {
    return this.foodAmounts.reduce((sum, x) => sum + x.amount, 0)
  }
}

export const recipeRef = rootRef<Recipe>("recipeRef")

@model("Meal")
export class Meal extends Model({
  id: idProp,
  name: prop<string>(),
  recipes: prop<Ref<Recipe>[]>(),
  foodAmounts: prop<FoodAmount[]>(),
}) {
  @computed
  get carbs() {
    return (
      this.foodAmounts.reduce((sum, x) => sum + x.carbs, 0) +
      this.recipes.reduce((sum, x) => sum + x.current.carbs, 0)
    )
  }
  @computed
  get proteins() {
    return (
      this.foodAmounts.reduce((sum, x) => sum + x.proteins, 0) +
      this.recipes.reduce((sum, x) => sum + x.current.proteins, 0)
    )
  }
  @computed
  get fats() {
    return (
      this.foodAmounts.reduce((sum, x) => sum + x.fats, 0) +
      this.recipes.reduce((sum, x) => sum + x.current.fats, 0)
    )
  }
  @computed
  get calories() {
    return (
      this.foodAmounts.reduce((sum, x) => sum + x.calories, 0) +
      this.recipes.reduce((sum, x) => sum + x.current.calories, 0)
    )
  }
  @computed
  get amount() {
    return (
      this.foodAmounts.reduce((sum, x) => sum + x.amount, 0) +
      this.recipes.reduce((sum, x) => sum + x.current.amount, 0)
    )
  }
}

@model("Target")
export class Target extends Model({
  carbs: prop<number>(),
  proteins: prop<number>(),
  fats: prop<number>(),
}) {}

@model("AppStore")
export class AppStore extends Model({
  target: prop<Target>(),
  foods: prop<Food[]>(),
  meals: prop<Meal[]>(),
  recipes: prop<Recipe[]>(),
}) {
  getMealsWithFood(food: Food) {
    // TODO: Check recipes for food as well.
    return this.meals.filter(
      (meal) => !!meal.foodAmounts.find((x) => food.id === x.food.current.id),
    )
  }
  getMealsWithRecipe(recipe: Recipe) {
    return this.meals.filter(
      (meal) => !!meal.recipes.find((x) => recipe.id === x.current.id),
    )
  }
}
