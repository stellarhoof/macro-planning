import _ from "lodash/fp.js"
import { useState } from "react"
import { useReaction } from "./util/mobx.js"
import { formatGrams, formatNumber } from "./util/format.js"
import { useTable, Table } from "./components/Table.jsx"
import { sortingColumn, filteringColumn, expansionColumn } from "./columns.jsx"

const makeColumns = () => [
  _.merge(expansionColumn(), {
    id: "expansion",
  }),
  _.merge(filteringColumn(), {
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
  _.merge(sortingColumn(), {
    accessorKey: "calories",
    display: formatNumber,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "amount",
    display: formatGrams,
    isNumeric: true,
  }),
]

export const Meals = ({ store, ...props }) => {
  const [columns] = useState(() => makeColumns(store))
  const [data, setData] = useState([])
  useReaction(() => [...store.meals], setData, { fireImmediately: true })
  const table = useTable({
    data,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
    expanded: {},
    getSubRows: (row) => [
      ..._.map(
        (food) => ({
          name: food.id.name,
          ..._.pick(["carbs", "proteins", "fats", "calories", "amount"], food),
        }),
        row.foods,
      ),
      ..._.map(
        (recipe) => ({
          name: recipe.id.name,
          ..._.pick(
            ["carbs", "proteins", "fats", "calories", "amount", "foods"],
            recipe,
          ),
        }),
        row.recipes,
      ),
    ],
  })
  return <Table table={table} {...props} />
}
