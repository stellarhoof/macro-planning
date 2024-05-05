import { getNumberInRange } from "#lib/util.ts"

function genId() {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0]?.toString()
}

export const foods = [
  {
    name: "Rolled Oats",
    brand: "",
    carbs: 70,
    proteins: 13,
    fats: 6,
  },
  {
    name: "Chia Seeds",
    brand: "",
    carbs: 40,
    proteins: 18,
    fats: 30,
  },
  {
    name: "Flax Seeds",
    brand: "",
    carbs: 29,
    proteins: 18,
    fats: 42,
  },
  {
    name: "Pumpkin Seeds",
    brand: "",
    carbs: 11,
    proteins: 30,
    fats: 49,
  },
  {
    name: "White Rice",
    brand: "",
    carbs: 79,
    proteins: 7,
    fats: 1,
  },
  {
    name: "Brown Rice",
    brand: "",
    carbs: 76,
    proteins: 8,
    fats: 3,
  },
  {
    name: "Amaranth",
    brand: "",
    carbs: 65,
    proteins: 14,
    fats: 7,
  },
  {
    name: "Quinoa",
    brand: "",
    carbs: 64,
    proteins: 14,
    fats: 6,
  },
  {
    name: "Potato",
    brand: "",
    carbs: 17,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Whole Wheat Pita",
    brand: "",
    carbs: 56,
    proteins: 10,
    fats: 2,
  },
  {
    name: "Nutritional Yeast",
    brand: "",
    carbs: 31,
    proteins: 50,
    fats: 3,
  },
  {
    name: "Spirulina",
    brand: "",
    carbs: 24,
    proteins: 58,
    fats: 8,
  },
  {
    name: "Pumpkin",
    brand: "",
    carbs: 7,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Taro (Malanga)",
    brand: "",
    carbs: 26,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Yam (Ñame)",
    brand: "",
    carbs: 28,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Sweet Potato",
    brand: "",
    carbs: 20,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Red Onion",
    brand: "",
    carbs: 10,
    proteins: 1,
    fats: 0,
  },
  {
    name: "White Onion",
    brand: "",
    carbs: 8,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Yellow Onion",
    brand: "",
    carbs: 9,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Broccoli",
    brand: "",
    carbs: 6,
    proteins: 3,
    fats: 0,
  },
  {
    name: "Carrots",
    brand: "",
    carbs: 10,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Pistachios",
    brand: "",
    carbs: 27,
    proteins: 20,
    fats: 45,
  },
  {
    name: "Walnuts",
    brand: "",
    carbs: 14,
    proteins: 15,
    fats: 65,
  },
  {
    name: "Cashews",
    brand: "",
    carbs: 30,
    proteins: 18,
    fats: 44,
  },
  {
    name: "Almonds",
    brand: "",
    carbs: 22,
    proteins: 21,
    fats: 50,
  },
  {
    name: "Pecans",
    brand: "",
    carbs: 14,
    proteins: 9,
    fats: 72,
  },
  {
    name: "Lentils",
    brand: "",
    carbs: 63,
    proteins: 25,
    fats: 1,
  },
  {
    name: "Black Beans",
    brand: "",
    carbs: 62,
    proteins: 22,
    fats: 1,
  },
  {
    name: "Kidney Beans",
    brand: "",
    carbs: 61,
    proteins: 23,
    fats: 1,
  },
  {
    name: "Chickpeas",
    brand: "",
    carbs: 63,
    proteins: 20,
    fats: 6,
  },
  {
    name: "Shiitake Mushrooms",
    brand: "",
    carbs: 7,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Portabella Mushrooms",
    brand: "",
    carbs: 4,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Prunes",
    brand: "",
    carbs: 64,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Banana",
    brand: "",
    carbs: 23,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Strawberries",
    brand: "",
    carbs: 8,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Roasted Almond Butter",
    brand: "Whole Foods",
    carbs: 28,
    proteins: 14,
    fats: 39,
  },
  {
    name: "Pea Milk",
    brand: "Ripple",
    carbs: 2,
    proteins: 3,
    fats: 2,
  },
  {
    name: "2% Fat Cottage Cheese",
    brand: "365",
    carbs: 4,
    proteins: 11,
    fats: 2,
  },
  {
    name: "1% Fat Yogurt",
    brand: "Green Valley",
    carbs: 5,
    proteins: 5,
    fats: 1,
  },
  {
    name: "Butter",
    brand: "",
    carbs: 0,
    proteins: 1,
    fats: 81,
  },
  {
    name: "Egg",
    brand: "",
    carbs: 1,
    proteins: 13,
    fats: 11,
  },
  {
    name: "Apple",
    brand: "",
    carbs: 15,
    proteins: 0,
    fats: 0,
  },
  {
    name: "Chickpea Flour",
    brand: "Bob's Red Mill",
    carbs: 70,
    proteins: 17,
    fats: 5,
  },
  {
    name: "Maple Syrup",
    brand: "365",
    carbs: 67,
    proteins: 0,
    fats: 0,
  },
  {
    name: "Oil",
    brand: "",
    carbs: 0,
    proteins: 0,
    fats: 94,
  },
  {
    name: "Polenta",
    brand: "Bob's Red Mill",
    carbs: 77,
    proteins: 9,
    fats: 0,
  },
  {
    name: "Hulled Hemp Seeds",
    brand: "",
    carbs: 9,
    proteins: 32,
    fats: 49,
  },
  {
    name: "Millet",
    brand: "",
    carbs: 73,
    proteins: 11,
    fats: 4,
  },
  {
    name: "Medjool Date",
    brand: "",
    carbs: 75,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Tomato",
    brand: "",
    carbs: 4,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Avocado",
    brand: "",
    carbs: 9,
    proteins: 2,
    fats: 15,
  },
  {
    name: "Firm Tofu",
    brand: "",
    carbs: 3,
    proteins: 17,
    fats: 9,
  },
  {
    name: "Wild Rice",
    brand: "",
    carbs: 75,
    proteins: 15,
    fats: 1,
  },
  {
    name: "Asparagus",
    brand: "",
    carbs: 4,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Tempeh",
    brand: "Lightlife",
    carbs: 13,
    proteins: 23,
    fats: 10,
  },
  {
    name: "Steel Cut Oats",
    brand: "Bob's Red Mill",
    carbs: 70,
    proteins: 11,
    fats: 6,
  },
  {
    name: "Shallots",
    brand: "",
    carbs: 17,
    proteins: 3,
    fats: 0,
  },
  {
    name: "Arugula",
    brand: "",
    carbs: 4,
    proteins: 3,
    fats: 1,
  },
  {
    name: "Red Bell Pepper",
    brand: "",
    carbs: 6,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Green Bell Pepper",
    brand: "",
    carbs: 5,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Zucchini",
    brand: "",
    carbs: 3,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Edamame",
    brand: "",
    carbs: 9,
    proteins: 12,
    fats: 5,
  },
  {
    name: "Winter Squash",
    brand: "",
    carbs: 9,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Raisins",
    brand: "",
    carbs: 79,
    proteins: 3,
    fats: 0,
  },
  {
    name: "Beets",
    brand: "",
    carbs: 10,
    proteins: 2,
    fats: 0,
  },
  {
    name: "Parsnips",
    brand: "",
    carbs: 18,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Blueberries",
    brand: "",
    carbs: 15,
    proteins: 1,
    fats: 0,
  },
  {
    name: "Plant Protein",
    brand: "Orgain",
    carbs: 33,
    proteins: 46,
    fats: 9,
  },
  {
    name: "4% Fat Cottage Cheese",
    brand: "365",
    carbs: 4,
    proteins: 11,
    fats: 4,
  },
  {
    name: "Plain Organic Yogurt",
    brand: "Seven Stars Farm",
    carbs: 4,
    proteins: 3,
    fats: 4,
  },
].map((data) => ({
  ...data,
  id: genId(),
  $modelType: "Food",
}))

const steps = [
  "Preheat oven to 425°F.",
  "Cut off the woody bottom part of the asparagus spears and discard.",
  'With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all.",string.", and if you eat asparagus you know what I mean by that).',
  "Place asparagus on foil-lined baking sheet and drizzle with olive oil.",
  "Sprinkle with salt.",
  "With your hands, roll the asparagus around until they are evenly coated with oil and salt.",
  "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.",
  "They should be tender when pierced with the tip of a knife.",
  "The tips of the spears will get very brown but watch them to prevent burning.",
  "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal.",
]

function range(from: number, to: number) {
  return Array.from({ length: to }, (_, i) => i + from)
}

export function createRandomFoodAmounts(size: number) {
  return range(0, size).map(() => ({
    food: {
      id: foods[getNumberInRange(0, foods.length)]?.id,
      $modelType: "foodRef",
    },
    amount: getNumberInRange(50, 150),
    $modelType: "FoodAmount",
  }))
}

const recipes = [
  { name: "Chili" },
  { name: "Pasta" },
  { name: "Bean Soup" },
  { name: "Steamed Rice" },
  { name: "Apple Pie" },
  { name: "Muffins" },
].map((data) => ({
  ...data,
  id: genId(),
  steps,
  foodAmounts: createRandomFoodAmounts(5),
  $modelType: "Recipe",
}))

const meals = [
  { name: "Breakfast" },
  { name: "Morning Snack" },
  { name: "Lunch" },
  { name: "Afternoon Snack" },
  { name: "Dinner" },
  { name: "Evening Snack" },
].map((data) => ({
  ...data,
  id: genId(),
  recipes: recipes.map((recipe) => ({
    id: recipe.id,
    $modelType: "recipeRef",
  })),
  foodAmounts: createRandomFoodAmounts(5),
  $modelType: "Meal",
}))

const target = {
  carbs: 0,
  proteins: 0,
  fats: 0,
  $modelType: "Target",
}

export const snapshot = {
  target,
  foods,
  recipes,
  meals,
  $modelType: "AppStore",
}
