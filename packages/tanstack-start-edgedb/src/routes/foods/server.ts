import { createServerFn } from "@tanstack/start"
import { type Client, createClient } from "edgedb"

import type { Food } from "#dbschema/interfaces.ts"

let client: Client

export function getClient() {
  return client ?? createClient()
}

interface SearchParams {
  page: number
  pageSize: number
  orderBy: string
  orderDir: "asc" | "desc"
}

export const getFoods = createServerFn("GET", async (params: SearchParams) => {
  const query = `
    with
      remaining := (select Food order by .${params.orderBy} ${params.orderDir} offset ${params.page * params.pageSize}),
      results := (select remaining limit ${params.pageSize})
    select {
      items := results {*},
      hasPreviousPage := ${params.page} > 0,
      hasNextPage := count(remaining) > ${params.pageSize}
    }
  `

  const result = await getClient().querySingle<{
    items: Food[]
    hasPreviousPage: boolean
    hasNextPage: boolean
  }>(query)

  return result ?? { items: [], hasPreviousPage: false, hasNextPage: false }
})
