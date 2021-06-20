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

export default types
  .model({
    foods: types.array(Food),
    target: types.model({
      carbs: types.integer,
      proteins: types.integer,
      fats: types.integer,
    }),
    currentMeal: types.integer,
    meals: types.array(
      types
        .model({
          name: types.string,
          foods: types.array(
            types.model({
              id: types.reference(Food),
              amount: types.integer,
            })
          ),
        })
        .actions(self => ({
          addFood(food) {
            if (!self.foods.find(x => x.id.id === food.id)) {
              self.foods.push({ id: food.id, amount: 100 })
            }
          },
        }))
    ),
  })
  .actions(self => ({
    removeMeal(index) {
      self.meals.splice(index, 1)
      self.currentMeal = index - (index && 1)
    },
    addMeal(meal) {
      self.meals.push(meal)
      self.currentMeal = self.meals.length - 1
    },
  }))
