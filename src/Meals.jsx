import _ from "lodash/fp"
import React from "react"
import { action, reaction } from "mobx"
import { Icon, IconButton } from "@chakra-ui/react"
import { formatGrams, formatNumber } from "./util.js"
import {
  Table,
  useTable,
  sortingColumn,
  filteringColumn,
  expansionColumn,
} from "./Table.jsx"
import { MdAdd, MdDelete } from "react-icons/md"

const columns = (meals) => [
  {
    id: "expansion",
    ...expansionColumn(),
  },
  {
    accessorKey: "name",
    ...filteringColumn(),
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
  {
    accessorKey: "calories",
    display: formatNumber,
    isNumeric: true,
    ...sortingColumn(),
  },
  {
    accessorKey: "amount",
    display: formatGrams,
    isNumeric: true,
    ...sortingColumn(),
  },
  {
    id: "control",
    header: (
      <IconButton
        icon={<Icon as={MdAdd} boxSize="1.2em" />}
        size="xs"
        variant="ghost"
        colorScheme="green"
        onClick={() => {
          console.info("add")
        }}
      />
    ),
    cell: ({ row }) =>
      row.depth === 0 && (
        <IconButton
          icon={<Icon as={MdDelete} boxSize="1.2em" />}
          size="xs"
          variant="ghost"
          colorScheme="red"
          onClick={action(() => {
            meals.splice(row.index, 1)
          })}
        />
      ),
    props: { td: { py: 0 } },
  },
]

let useReaction = (...args) => React.useEffect(() => reaction(...args), [])

export default ({ store, ...props }) => {
  const [data, setData] = React.useState([])
  useReaction(() => _.toArray(store.meals), setData, { fireImmediately: true })
  const table = useTable({
    data,
    columns: columns(store.meals),
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
