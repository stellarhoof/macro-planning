CREATE MIGRATION m1ivwx4hnuoo2bsviel5za2fq3uxkaerjp4eiaurb7sshaajvgqtea
    ONTO m1egexopxzovf7w6gpomypuocx73scsiuoqsri6bwippan5h3tomra
{
  ALTER TYPE default::FoodAmount {
      ALTER PROPERTY carbs {
          USING (std::round((.food.carbs * (.grams / 100))));
      };
      ALTER PROPERTY fats {
          USING (std::round((.food.fats * (.grams / 100))));
      };
      ALTER PROPERTY proteins {
          USING (std::round((.food.proteins * (.grams / 100))));
      };
  };
};
