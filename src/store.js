import _ from "lodash/fp"
import { types } from "mobx-state-tree"

const Food = types.model({
  id: types.identifier,
  name: types.string,
  brand: types.string,
  carbs: types.integer,
  proteins: types.integer,
  fats: types.integer,
})

const FoodAmount = types
  .model({
    id: types.reference(Food),
    amount: types.integer,
  })
  .views((self) => ({
    getTotal(key) {
      return Math.round(self.id[key] * (self.amount / 100))
    },
    get carbs() {
      return self.getTotal("carbs")
    },
    get proteins() {
      return self.getTotal("proteins")
    },
    get fats() {
      return self.getTotal("fats")
    },
    get calories() {
      return self.carbs * 4 + self.proteins * 4 + self.fats * 9
    },
  }))

const Recipe = types
  .model({
    id: types.identifier,
    name: types.string,
    steps: types.array(types.string),
    ingredients: types.array(FoodAmount),
  })
  .views((self) => ({
    get carbs() {
      return _.sumBy("carbs", self.ingredients)
    },
    get proteins() {
      return _.sumBy("proteins", self.ingredients)
    },
    get fats() {
      return _.sumBy("fats", self.ingredients)
    },
    get calories() {
      return _.sumBy("calories", self.ingredients)
    },
    get amount() {
      return _.sumBy("amount", self.ingredients)
    },
  }))

const Meal = types
  .model({
    name: types.string,
    foods: types.array(FoodAmount),
    recipes: types.array(types.reference(Recipe)),
  })
  .views((self) => ({
    get carbs() {
      return _.sumBy("carbs", self.foods) + _.sumBy("carbs", self.recipes)
    },
    get proteins() {
      return _.sumBy("proteins", self.foods) + _.sumBy("proteins", self.recipes)
    },
    get fats() {
      return _.sumBy("fats", self.foods) + _.sumBy("fats", self.recipes)
    },
    get calories() {
      return _.sumBy("calories", self.foods) + _.sumBy("calories", self.recipes)
    },
    get amount() {
      return _.sumBy("amount", self.foods) + _.sumBy("amount", self.recipes)
    },
  }))

const Target = types.model({
  carbs: types.integer,
  proteins: types.integer,
  fats: types.integer,
})

export const Store = types
  .model({
    tab: types.number,
    target: Target,
    foods: types.array(Food),
    meals: types.array(Meal),
    recipes: types.array(Recipe),
  })
  .views((self) => ({
    getMealsWithFood(food) {
      // TODO: Check recipes for food as well.
      return _.filter(
        (meal) => _.some((x) => x.id.id === food.id, meal.foods),
        self.meals
      )
    },
    getMealsWithRecipe(recipe) {
      return _.filter(
        (meal) => _.some((x) => x.id.id === recipe.id, meal.recipes),
        self.meals
      )
    },
  }))
