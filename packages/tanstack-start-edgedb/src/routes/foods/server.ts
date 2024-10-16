import { createServerFn } from "@tanstack/start"
import { type Client, createClient } from "edgedb"
import e from "#dbschema/edgeql-js/index.ts"

import type { Food } from "#dbschema/interfaces.ts"

let client: Client

export function getClient() {
  return client ?? createClient()
}

interface SearchParams {
  offset: number
  limit: number
  orderBy: string
  orderDir: "asc" | "desc"
}

export const getFoods = createServerFn("GET", async (params: SearchParams) => {
  console.log(params)

  const query = `
    select Food
    order by .${params.orderBy} ${params.orderDir}
    offset ${params.offset}
    limit ${params.limit}
  `

  const result = await getClient().query<Food[]>(query)

  console.log(result)

  return result
})
