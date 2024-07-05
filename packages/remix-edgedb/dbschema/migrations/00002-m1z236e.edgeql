CREATE MIGRATION m1z236e7euuimfafub4ung7orkptl4clejvrm65iwakzcgs3xse2ca
    ONTO m1h3aowp6r3ssuhx5xhlu2mzngsydiiaxlua2vm77affpi3vnqrmfa
{
  ALTER TYPE default::RecipeFoodAmount RENAME TO default::FoodAmount;
};
