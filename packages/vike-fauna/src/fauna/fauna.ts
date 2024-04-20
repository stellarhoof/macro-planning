/*
Start fauna with `yarn db`

See https://docs.fauna.com/fauna/current/tools/shell/install for how to connect to local db

Publish schema with `fauna schema push`

https://docs.fauna.com/fauna/current/cookbook/advanced/fsl/get_started_fsl
*/

import { Client, FaunaError, endpoints, fql } from "fauna"

// configure your client
const client = new Client({
  secret: "secret",
  endpoint: endpoints.local,
  typecheck: true,
})

try {
  await client.query(fql`Collection.create({ name: "User" })`)

  // // execute the query
  // const result = await client.query<Dog>(collectionQuery)
  // console.log(result)

  // // define some data in your app
  // const dog = { name: "Scout" }
  //
  // // query using your app's local variables
  // const documentQuery = fql`
  //   Dogs.create(${dog}) {
  //     id,
  //     ts,
  //     name
  //   }
  // `
  //
  // // execute the query
  // console.log(await client.query(documentQuery))
} catch (error) {
  console.error(error)
  if (error instanceof FaunaError) {
    // handle errors
  }
} finally {
  // clean up any remaining resources
  client.close()
}
