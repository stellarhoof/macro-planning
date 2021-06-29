import { types } from './pkg/mobx-state-tree.js'
import { isValidDate, formatDate } from './util.js'

let Food = types.model({
  id: types.identifier,
  name: types.string,
  brand: types.string,
  carbs: types.integer,
  proteins: types.integer,
  fats: types.integer,
})

let Meal = types
  .model({
    name: types.string,
    foods: types.array(
      types
        .model({
          id: types.reference(Food),
          amount: types.integer,
        })
        .actions(self => ({
          set(key, value) {
            self[key] = value
          },
        }))
    ),
  })
  .actions(self => ({
    addFood(food) {
      if (!self.foods.find(x => x.id.id === food.id)) {
        self.foods.push({ id: food.id, amount: 100 })
      }
    },
    removeFood(index) {
      self.foods.splice(index, 1)
    },
  }))

export default types
  .model({
    foods: types.array(Food),
    target: types
      .model({
        carbs: types.integer,
        proteins: types.integer,
        fats: types.integer,
      })
      .actions(self => ({
        set(key, value) {
          self[key] = value
        },
      })),
    currentMeal: types.integer,
    meals: types.array(Meal),
  })
  .actions(self => ({
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
  }))
