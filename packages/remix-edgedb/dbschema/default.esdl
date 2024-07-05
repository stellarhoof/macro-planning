module default {
  type User {
    required email: str;
    multi foods: Food;
    multi recipes: Recipe;
    multi meals: Meal;
    multi plans: Plan;
  }

  type Food {
    required name: str;
    brand: str;
    required fats: int16;
    required carbs: int16;
    required proteins: int16;
    required calories := .fats * 9 + .carbs * 4 + .proteins * 4;
  }

  type FoodAmount {
    required food: Food;
    required grams: int16;
    required fats := round(.food.fats * (.grams / 100));
    required carbs := round(.food.carbs * (.grams / 100));
    required proteins := round(.food.proteins * (.grams / 100));
    required calories := .fats * 9 + .carbs * 4 + .proteins * 4;
  }

  type Recipe {
    required name: str;
    steps: array<str>;
    multi foodAmounts: FoodAmount;
    required grams := sum((for amount in .foodAmounts union amount.grams));
    required fats := sum((for amount in .foodAmounts union amount.fats));
    required carbs := sum((for amount in .foodAmounts union amount.carbs));
    required proteins := sum((for amount in .foodAmounts union amount.proteins));
    required calories := sum((for amount in .foodAmounts union amount.calories));
  }
  
  type Meal {
    required name: str;
    multi recipes: Recipe;
    multi foodAmounts: FoodAmount;
    required grams :=
      sum((for recipe in .recipes union recipe.grams)) +
      sum((for amount in .foodAmounts union amount.grams));
    required fats :=
      sum((for recipe in .recipes union recipe.fats)) +
      sum((for amount in .foodAmounts union amount.fats));
    required carbs :=
      sum((for recipe in .recipes union recipe.carbs)) +
      sum((for amount in .foodAmounts union amount.carbs));
    required proteins :=
      sum((for recipe in .recipes union recipe.proteins)) +
      sum((for amount in .foodAmounts union amount.proteins));
    required calories :=
      sum((for recipe in .recipes union recipe.calories)) +
      sum((for amount in .foodAmounts union amount.calories));
  }

  type Plan {
    required name: str;
    required fats: int16;
    required carbs: int16;
    required proteins: int16;
  }
}
