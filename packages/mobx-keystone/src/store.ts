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
import * as R from "ramda"

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
    return Math.round(this.food.current.carbs * (this.amount / 100))
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
    return R.sum(R.map((x) => x.carbs, this.foodAmounts))
  }
  @computed
  get proteins() {
    return R.sum(R.map((x) => x.proteins, this.foodAmounts))
  }
  @computed
  get fats() {
    return R.sum(R.map((x) => x.fats, this.foodAmounts))
  }
  @computed
  get calories() {
    return R.sum(R.map((x) => x.calories, this.foodAmounts))
  }
  @computed
  get amount() {
    return R.sum(R.map((x) => x.amount, this.foodAmounts))
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
      R.sum(R.map((x) => x.carbs, this.foodAmounts)) +
      R.sum(R.map((x) => x.current.carbs, this.recipes))
    )
  }
  @computed
  get proteins() {
    return (
      R.sum(R.map((x) => x.proteins, this.foodAmounts)) +
      R.sum(R.map((x) => x.current.proteins, this.recipes))
    )
  }
  @computed
  get fats() {
    return (
      R.sum(R.map((x) => x.fats, this.foodAmounts)) +
      R.sum(R.map((x) => x.current.fats, this.recipes))
    )
  }
  @computed
  get calories() {
    return (
      R.sum(R.map((x) => x.calories, this.foodAmounts)) +
      R.sum(R.map((x) => x.current.calories, this.recipes))
    )
  }
  @computed
  get amount() {
    return (
      R.sum(R.map((x) => x.amount, this.foodAmounts)) +
      R.sum(R.map((x) => x.current.amount, this.recipes))
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
    return R.filter(
      (meal) => R.any((x) => food.id === x.food.current.id, meal.foodAmounts),
      this.meals,
    )
  }
  getMealsWithRecipe(recipe: Recipe) {
    return R.filter(
      (meal) => R.any((x) => recipe.id === x.current.id, meal.recipes),
      this.meals,
    )
  }
}
