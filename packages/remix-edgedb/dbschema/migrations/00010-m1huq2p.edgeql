CREATE MIGRATION m1huq2punhiub4egyyylmhmd6vttyastec5wwxvckjf7awbecwkbna
    ONTO m1ivwx4hnuoo2bsviel5za2fq3uxkaerjp4eiaurb7sshaajvgqtea
{
  ALTER TYPE default::Food {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Meal {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Plan {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Recipe {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
