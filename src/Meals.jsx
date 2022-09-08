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
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

const columns = (meals) => [
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
  {
    id: "control",
    header: (
      <IconButton
        icon={<Icon as={MdAddCircle} boxSize="1.2em" />}
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
          icon={<Icon as={MdRemoveCircle} boxSize="1.2em" />}
          size="xs"
          variant="ghost"
          colorScheme="red"
          onClick={action(() => {
            meals.splice(row.index, 1)
          })}
        />
      ),
    props: { th: { py: 0 }, td: { py: 0 } },
  },
]

const useReaction = (...args) => React.useEffect(() => reaction(...args), [])

export const Meals = ({ store, ...props }) => {
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
