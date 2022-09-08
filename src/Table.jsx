import _ from "lodash/fp"
import { action, observable } from "mobx"
import { useState } from "react"
import { useReactTable, flexRender } from "@tanstack/react-table"
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table"
import {
  Table as TableComponent,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
  Icon,
  Input,
} from "@chakra-ui/react"
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

const callOrReturn = (fn, ...args) => (_.isFunction(fn) ? fn(...args) : fn)

export const Table = ({ table, showFooter, ...props }) => (
  <TableComponent {...props}>
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const ctx = header.getContext()
            const def = header.column.columnDef
            return (
              <Th
                key={header.id}
                isNumeric={def.isNumeric}
                {...callOrReturn(def.props?.th, ctx)}
              >
                {flexRender(!header.isPlaceholder && def.header, {
                  ...callOrReturn(def.props?.header, ctx),
                  ...ctx,
                })}
              </Th>
            )
          })}
        </Tr>
      ))}
    </Thead>
    <Tbody>
      {table.getRowModel().rows.map((row) => (
        <Tr key={row.id} bg={row.depth > 0 && "gray.50"}>
          {row.getVisibleCells().map((cell) => {
            const ctx = cell.getContext()
            const def = cell.column.columnDef
            return (
              <Td
                key={cell.id}
                isNumeric={def.isNumeric}
                {...callOrReturn(def.props?.td, ctx)}
              >
                {flexRender(def.cell, {
                  ...callOrReturn(def.props?.cell, ctx),
                  ...ctx,
                })}
              </Td>
            )
          })}
        </Tr>
      ))}
    </Tbody>
    {showFooter && (
      <Tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <Tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => {
              const ctx = header.getContext()
              const def = header.column.columnDef
              return (
                <Th key={header.id} {...callOrReturn(def.props?.th, ctx)}>
                  {flexRender(!header.isPlaceholder && def.footer, {
                    ...callOrReturn(def.props?.footer, ctx),
                    ...ctx,
                  })}
                </Th>
              )
            })}
          </Tr>
        ))}
      </Tfoot>
    )}
  </TableComponent>
)

export const useTable = ({
  columns,
  data,
  filtering,
  sorting: defaultSorting,
  expanded: defaultExpanded,
  ...rest
}) => {
  const props = {
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      cell: (context) =>
        context.column.columnDef.display?.(context.getValue()) ||
        context.renderValue(context),
    },
    ...rest,
  }

  // Enable filtering
  if (filtering) {
    props.getFilteredRowModel = getFilteredRowModel()
  }

  // Enable sorting
  const [sorting, setSorting] = useState(defaultSorting)
  if (defaultSorting) {
    props.state.sorting = sorting
    props.onSortingChange = setSorting
    props.getSortedRowModel = getSortedRowModel()
  }

  // Enable expanded
  const [expanded, setExpanded] = useState(defaultExpanded)
  if (defaultExpanded) {
    props.state.expanded = expanded
    props.onExpandedChange = setExpanded
    props.getExpandedRowModel = getExpandedRowModel()
  }

  return useReactTable(props)
}
