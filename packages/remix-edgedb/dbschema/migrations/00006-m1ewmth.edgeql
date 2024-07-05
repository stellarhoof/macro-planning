CREATE MIGRATION m1ewmth6fujqjmhabj7wrtf5m7rp5pxls4kksxgnbn5pc5jphxi22a
    ONTO m1c5jumafluswuoas5y2uwrbbmu6prsxusqc2bbl7iirguo5b7xxoq
{
  ALTER TYPE default::Recipe {
      CREATE REQUIRED PROPERTY calories := (std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.calories)));
      CREATE REQUIRED PROPERTY carbs := (std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.carbs)));
      CREATE REQUIRED PROPERTY fats := (std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.fats)));
      CREATE REQUIRED PROPERTY proteins := (std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.proteins)));
  };
};
