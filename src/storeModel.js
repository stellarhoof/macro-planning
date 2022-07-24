import { types } from "mobx-state-tree"
import { get, set } from "lodash"

const Lens = types
  .model({})
  .views((self) => ({
    get(key) {
      return get(self, key)
    },
  }))
  .actions((self) => ({
    set(key, value) {
      set(self, key, value)
    },
  }))

const Food = types.compose(
  types.model({
    id: types.identifier,
    name: types.string,
    brand: types.string,
    carbs: types.integer,
    proteins: types.integer,
    fats: types.integer,
  }),
  Lens,
)

const FoodAmount = types.compose(
  types.model({
    id: types.reference(Food),
    amount: types.integer,
  }),
  Lens,
)

const FoodsAmounts = types.array(FoodAmount)

const Meal = types.compose(
  types
    .model({
      name: types.string,
      foods: FoodsAmounts,
    })
    .actions((self) => ({
      addFood(food) {
        if (!self.foods.find((x) => x.id.id === food.id)) {
          self.foods.push({ id: food.id, amount: 100 })
        }
      },
      removeFood(index) {
        self.foods.splice(index, 1)
      },
    })),
  Lens,
)

const Meals = types.array(Meal)

const Target = types.compose(
  types.model({
    carbs: types.integer,
    proteins: types.integer,
    fats: types.integer,
  }),
  Lens,
)

const Foods = types.array(Food)

const Store = types.compose(
  types
    .model({
      foods: Foods,
      target: Target,
      currentMeal: types.integer,
      meals: Meals,
    })
    .actions((self) => ({
      removeMeal(index) {
        self.meals.splice(index, 1)
        self.currentMeal = index - (index && 1)
      },
      addMeal(meal) {
        self.meals.unshift(meal)
        self.currentMeal = 0
      },
      selectMeal(index) {
        self.currentMeal = index
      },
    })),
  Lens,
)

export default Store
