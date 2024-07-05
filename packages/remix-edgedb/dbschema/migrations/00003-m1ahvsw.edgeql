CREATE MIGRATION m1ahvswdfcaplfevylmo6c4iznort4dynkl3autcgcpdmxumjev6eq
    ONTO m1z236e7euuimfafub4ung7orkptl4clejvrm65iwakzcgs3xse2ca
{
  ALTER TYPE default::Food {
      CREATE REQUIRED PROPERTY calories := ((((.fats * 9) + (.carbs * 4)) + (.proteins * 4)));
  };
  ALTER TYPE default::FoodAmount {
      CREATE REQUIRED PROPERTY carbs := (((.food.carbs * .grams) / 100));
      CREATE REQUIRED PROPERTY fats := (((.food.fats * .grams) / 100));
      CREATE REQUIRED PROPERTY proteins := (((.food.proteins * .grams) / 100));
      CREATE REQUIRED PROPERTY calories := ((((.fats * 9) + (.carbs * 4)) + (.proteins * 4)));
  };
};
