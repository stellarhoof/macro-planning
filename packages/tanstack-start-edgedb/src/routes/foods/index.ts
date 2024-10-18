import { createFileRoute } from "@tanstack/react-router"
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter"
import { z } from "zod"

import { Component } from "./Component.tsx"
import { getFoods } from "./server.ts"

const searchSchema = z.object({
  page: fallback(z.number(), 0).default(0),
  pageSize: fallback(z.number(), 10).default(10),
  orderBy: fallback(z.string(), "name").default("name"),
  orderDir: fallback(z.enum(["asc", "desc"]), "asc").default("asc"),
})

export const Route = createFileRoute("/foods")({
  component: Component,
  validateSearch: zodSearchValidator(searchSchema),
  loaderDeps: ({ search }) => search,
  loader: ({ deps: search }) => getFoods(search),
})
