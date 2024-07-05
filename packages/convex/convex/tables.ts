import type { TableDefinition } from "convex/server"
import type { Validator } from "convex/values"
import * as _ from "radashi"
import schema from "./schema.js"

type Index = {
  indexDescriptor: string
  fields: string[]
}

type SearchIndex = {
  indexDescriptor: string
  searchField: string
  filterFields: string[]
}

type VectorIndex = {
  indexDescriptor: string
  vectorField: string
  dimensions: number
  filterFields: string[]
}

export interface ExportedTable {
  documentType: Validator<unknown, "optional", string>
  indexes: Index[]
  searchIndexes: SearchIndex[]
  vectorIndexes: VectorIndex[]
}

type TableWithExport<T extends TableDefinition> = T & {
  export: () => ExportedTable
}

export const tables = _.mapValues(schema.tables, (table) =>
  (table as TableWithExport<typeof table>).export(),
)
