import _ from "lodash/fp"
import { formatGrams } from "./util.js"
import { useTable, Table } from "./Table.jsx"
import { sortingColumn, controlColumn } from "./columns.jsx"

const columns = [
  _.merge(sortingColumn(), {
    accessorKey: "brand",
    props: { td: { whiteSpace: "nowrap" } },
  }),
  _.merge(sortingColumn(), {
    accessorKey: "name",
    props: { td: { whiteSpace: "nowrap" } },
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
  _.merge(controlColumn(), { id: "control" }),
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
