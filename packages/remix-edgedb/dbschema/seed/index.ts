import * as edgedb from "edgedb"

import common from "./common.json"

const client = edgedb.createClient()

const insertUsers = common.users
  .map(
    (user) => `
    insert User {
      email := "${user.email}"
    } unless conflict on .email;
  `,
  )
  .join("\n")

const insertFoods = common.foods
  .map(
    (food) => `
    insert Food {
      name := "${food.name}",
      brand := "${food.brand}",
      carbs := ${food.carbs},
      proteins := ${food.proteins},
      fats := ${food.fats},
    } unless conflict on .name;
  `,
  )
  .join("\n")

await client.execute(`
  ${insertUsers}
  ${insertFoods}
`)
