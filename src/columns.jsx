import _ from "lodash/fp"
import { action, observable } from "mobx"
import { Flex, Icon, Input } from "@chakra-ui/react"
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti"
import { FaCaretDown, FaCaretRight } from "react-icons/fa"

const sortingIcons = {
  asc: TiArrowSortedDown,
  desc: TiArrowSortedUp,
  unsorted: TiArrowUnsorted,
}

export const expansionColumn = () => ({
  props: {
    th: ({ table }) => ({
      cursor: "pointer",
      onClick: table.getToggleAllRowsExpandedHandler(),
      sx: { "> svg": { display: "block" } },
    }),
    td: ({ row }) => ({
      cursor: "pointer",
      onClick: row.getToggleExpandedHandler(),
      sx: { "> svg": { display: "block" } },
    }),
  },
  header: ({ table }) =>
    table.getCanSomeRowsExpand() && (
      <Icon
        as={table.getIsAllRowsExpanded() ? FaCaretDown : FaCaretRight}
        color="gray.600"
        boxSize="1.2em"
      />
    ),
  cell: ({ row }) =>
    row.getCanExpand() && (
      <Icon
        as={row.getIsExpanded() ? FaCaretDown : FaCaretRight}
        color="gray.600"
        boxSize="1.1em"
      />
    ),
})

export const filteringColumn = () => {
  let regexp = observable.box(null)
  return {
    cell: ({ cell }) => (
      <span
        dangerouslySetInnerHTML={{
          __html: cell.getValue().replace(regexp.get(), "<mark>$1</mark>"),
        }}
      />
    ),
    header: ({ column }) => (
      <Input
        size="sm"
        variant="flushed"
        borderColor="blue.300"
        value={column.getFilterValue() || ""}
        onInput={action((e) => {
          const value = e.target.value || undefined
          column.setFilterValue(value)
          regexp.set(new RegExp(`(${value})`, "ig"))
        })}
      />
    ),
    props: {
      td: { sx: { mark: { bg: "yellow" } } },
    },
  }
}

export const sortingColumn = () => ({
  header: ({ header: { column } }) => (
    <Flex
      cursor="pointer"
      alignItems="center"
      justifyContent={column.columnDef.isNumeric && "end"}
      onClick={column.getToggleSortingHandler()}
    >
      <span>{_.startCase(column.id)}</span>
      <Icon as={sortingIcons[column.getIsSorted() || "unsorted"]} />
    </Flex>
  ),
})
