import _ from "lodash/fp"
import { useState, Fragment } from "react"
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
} from "@chakra-ui/react"

const callOrReturn = (fn, ...args) => (_.isFunction(fn) ? fn(...args) : fn)

export const Table = ({ table, renderExpandedRow, showFooter, ...props }) => (
  <TableComponent fontFamily="monospace" {...props}>
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
        <Fragment key={row.id}>
          <Tr bg={row.depth > 0 && "gray.50"}>
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
          {renderExpandedRow && row.getIsExpanded() && (
            <Tr>{renderExpandedRow({ row })}</Tr>
          )}
        </Fragment>
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
        context.renderValue(context) ||
        "-",
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
