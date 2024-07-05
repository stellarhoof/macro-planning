CREATE MIGRATION m1c5jumafluswuoas5y2uwrbbmu6prsxusqc2bbl7iirguo5b7xxoq
    ONTO m1lnoaxwk6vaizpl5nur7whqvnue7uvgtn6nwraxhh6sdjd5gzzhfa
{
  ALTER TYPE default::Recipe {
      CREATE REQUIRED PROPERTY grams := (std::sum((FOR amount IN .foodAmounts
      UNION 
          amount.grams)));
  };
};
