import _ from "lodash/fp"
import { formatGrams } from "./util.js"
import { Table, sortingColumn, useTable } from "./Table.jsx"

const columns = [
  _.merge(sortingColumn(), {
    accessorKey: "name",
    props: { td: { w: "100%" } },
  }),
  _.merge(sortingColumn(), {
    accessorKey: "carbs",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "proteins",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "fats",
    display: formatGrams,
    isNumeric: true,
  }),
]

export const Foods = ({ store, ...props }) => {
  const table = useTable({
    data: store.foods,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
  })
  return <Table table={table} {...props} />
}
