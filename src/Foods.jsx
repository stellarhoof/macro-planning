import { useReactTable } from "@tanstack/react-table"
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react"
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti"
import { IoAddCircle } from "react-icons/io5"
import Table from "./Table.jsx"
import { formatGrams } from "./util.js"

const columns = [
  { accessor: "id" },
  {
    accessor: "name",
    Header: "",
    disableSortBy: true,
    Cell: ({ value }) => (
      <Stack align="center" direction="row">
        <Icon as={IoAddCircle} color="green.400" />
        <Box>{value}</Box>
      </Stack>
    ),
    Filter: ({ column }) => (
      <Input
        size="sm"
        variant="flushed"
        borderColor="blue.300"
        value={column.filterValue || ""}
        // undefined removes the filter
        onChange={(e) => column.setFilter(e.target.value || undefined)}
      />
    ),
  },
  {
    accessor: "carbs",
    Header: "Carbs",
    isNumeric: true,
    Cell: ({ value }) => formatGrams(value),
  },
  {
    accessor: "proteins",
    Header: "Proteins",
    isNumeric: true,
    Cell: ({ value }) => formatGrams(value),
  },
  {
    accessor: "fats",
    Header: "Fats",
    isNumeric: true,
    Cell: ({ value }) => formatGrams(value),
  },
]

const rowProps = (store, row) => ({
  cursor: "pointer",
  sx: { ":hover": { bg: "gray.100" } },
  onClick() {
    const meal = store.meals[store.currentMeal]
    if (meal) meal.addFood(row.values)
  },
})

export default ({ store, ...props }) => {
  const table = useReactTable({
    columns,
    data: store.foods,
    initialState: {
      pageSize: 20,
      sortBy: [{ id: "carbs", desc: true }],
      hiddenColumns: ["id"],
    },
  })

  const { getTableBodyProps, headerGroups, prepareRow, rows } = table

  rows.forEach(prepareRow)

  return (
    <Table
      sx={{
        tr: { pos: "relative" },
        th: {
          pos: "sticky",
          top: 0,
          zIndex: 1,
        },
      }}
      {...props}
    >
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                isNumeric={column.isNumeric}
                {...column.getHeaderProps(
                  column.canSort && {
                    cursor: "pointer",
                    onClick: () =>
                      column.toggleSortBy(column.isSortedDesc ? false : true),
                  },
                )}
              >
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  spacing="0"
                >
                  {column.canFilter && column.Filter && column.render("Filter")}
                  <span>{column.render("Header")}</span>
                  {column.canSort && (
                    <Icon
                      as={
                        !column.isSorted
                          ? TiArrowUnsorted
                          : column.isSortedDesc
                          ? TiArrowSortedDown
                          : TiArrowSortedUp
                      }
                    />
                  )}
                </Stack>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => (
          <Tr {...row.getRowProps(rowProps(store, row))}>
            {row.cells.map((cell) => (
              <Td isNumeric={cell.column.isNumeric} {...cell.getCellProps()}>
                {cell.render("Cell")}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
