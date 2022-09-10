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

const Meal = types
  .model({
    name: types.string,
    foods: types.array(FoodAmount),
  })
  .views((self) => ({
    get carbs() {
      return _.sumBy("carbs", self.foods)
    },
    get proteins() {
      return _.sumBy("proteins", self.foods)
    },
    get fats() {
      return _.sumBy("fats", self.foods)
    },
    get calories() {
      return _.sumBy("calories", self.foods)
    },
    get amount() {
      return _.sumBy("amount", self.foods)
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
  })
  .views((self) => ({
    getMealsWithFood(food) {
      return _.filter(
        (meal) => _.some((x) => x.id.id === food.id, meal.foods),
        self.meals,
      )
    },
  }))
