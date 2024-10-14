CREATE MIGRATION m1lnoaxwk6vaizpl5nur7whqvnue7uvgtn6nwraxhh6sdjd5gzzhfa
    ONTO m1ahvswdfcaplfevylmo6c4iznort4dynkl3autcgcpdmxumjev6eq
{
  ALTER TYPE default::FoodAmount {
      ALTER PROPERTY carbs {
          USING (std::round(((.food.carbs * .grams) / 100)));
      };
      ALTER PROPERTY fats {
          USING (std::round(((.food.fats * .grams) / 100)));
      };
      ALTER PROPERTY proteins {
          USING (std::round(((.food.proteins * .grams) / 100)));
      };
  };
};
