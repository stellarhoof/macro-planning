import { formatGrams } from "./util.js"
import { Table, sortingColumn, useTable } from "./Table.jsx"

const columns = [
  {
    accessorKey: "name",
    ...sortingColumn(),
  },
  {
    accessorKey: "carbs",
    display: formatGrams,
    isNumeric: true,
    ...sortingColumn(),
  },
  {
    accessorKey: "proteins",
    display: formatGrams,
    isNumeric: true,
    ...sortingColumn(),
  },
  {
    accessorKey: "fats",
    display: formatGrams,
    isNumeric: true,
    ...sortingColumn(),
  },
]

export default ({ store, ...props }) => {
  const table = useTable({
    data: store.foods,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
  })
  return <Table table={table} {...props} />
}
