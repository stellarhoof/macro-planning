CREATE MIGRATION m1lsnfxwevjj5gg2g2cjbmr7g7r3nud6k2rshi4wyonmdiodkh7mnq
    ONTO m1ewmth6fujqjmhabj7wrtf5m7rp5pxls4kksxgnbn5pc5jphxi22a
{
  ALTER TYPE default::FoodAmount {
      ALTER LINK food {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
