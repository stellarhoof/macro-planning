import _ from "lodash/fp"
import React from "react"
import { reaction } from "mobx"
import { formatGrams, formatNumber } from "./util.js"
import { useTable, Table } from "./Table.jsx"
import {
  controlColumn,
  sortingColumn,
  filteringColumn,
  expansionColumn,
} from "./columns.jsx"

const makeColumns = (store) => [
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
  _.merge(controlColumn(), { id: "control" }),
]

const useReaction = (...args) => React.useEffect(() => reaction(...args), [])

export const Meals = ({ store, ...props }) => {
  const [columns] = React.useState(() => makeColumns(store))
  const [data, setData] = React.useState([])
  useReaction(() => [...store.meals], setData, { fireImmediately: true })
  const table = useTable({
    data,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
    expanded: {},
    getSubRows: (row) =>
      _.map(
        (food) => ({
          name: food.id.name,
          ..._.pick(["carbs", "proteins", "fats", "calories", "amount"], food),
        }),
        row.foods,
      ),
  })
  return <Table table={table} {...props} />
}
