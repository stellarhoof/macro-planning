CREATE MIGRATION m1egexopxzovf7w6gpomypuocx73scsiuoqsri6bwippan5h3tomra
    ONTO m1lsnfxwevjj5gg2g2cjbmr7g7r3nud6k2rshi4wyonmdiodkh7mnq
{
  ALTER TYPE default::Meal {
      CREATE MULTI LINK foodAmounts: default::FoodAmount;
      CREATE MULTI LINK recipes: default::Recipe;
      CREATE REQUIRED PROPERTY calories := ((std::sum((FOR recipe IN .recipes
      UNION 
          recipe.calories)) + std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.calories))));
      CREATE REQUIRED PROPERTY carbs := ((std::sum((FOR recipe IN .recipes
      UNION 
          recipe.carbs)) + std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.carbs))));
      CREATE REQUIRED PROPERTY fats := ((std::sum((FOR recipe IN .recipes
      UNION 
          recipe.fats)) + std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.fats))));
      CREATE REQUIRED PROPERTY grams := ((std::sum((FOR recipe IN .recipes
      UNION 
          recipe.grams)) + std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.grams))));
      CREATE REQUIRED PROPERTY proteins := ((std::sum((FOR recipe IN .recipes
      UNION 
          recipe.proteins)) + std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.proteins))));
  };
};
