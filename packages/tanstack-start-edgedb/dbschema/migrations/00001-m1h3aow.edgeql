CREATE MIGRATION m1h3aowp6r3ssuhx5xhlu2mzngsydiiaxlua2vm77affpi3vnqrmfa
    ONTO initial
{
  CREATE TYPE default::Food {
      CREATE PROPERTY brand: std::str;
      CREATE REQUIRED PROPERTY carbs: std::int16;
      CREATE REQUIRED PROPERTY fats: std::int16;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY proteins: std::int16;
  };
  CREATE TYPE default::RecipeFoodAmount {
      CREATE REQUIRED LINK food: default::Food {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY grams: std::int16;
  };
  CREATE TYPE default::Meal {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Plan {
      CREATE REQUIRED PROPERTY carbs: std::int16;
      CREATE REQUIRED PROPERTY fats: std::int16;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY proteins: std::int16;
  };
  CREATE TYPE default::Recipe {
      CREATE MULTI LINK foodAmounts: default::RecipeFoodAmount;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY steps: array<std::str>;
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK foods: default::Food;
      CREATE MULTI LINK meals: default::Meal;
      CREATE MULTI LINK plans: default::Plan;
      CREATE MULTI LINK recipes: default::Recipe;
      CREATE REQUIRED PROPERTY email: std::str;
  };
};
