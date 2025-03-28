import { flexRender } from "@tanstack/react-table"
import type { Virtualizer } from "@tanstack/react-virtual"
import type {
  Row as TanstackRow,
  SortingState as TanstackSortingState,
  Table as TanstackTable,
} from "@tanstack/table-core"
import { type ForwardedRef, forwardRef, type Ref } from "react"
import {
  composeRenderProps,
  Table,
  TableBody,
  type TableProps,
} from "react-aria-components"

import { Cell, Column, Row, TableHeader } from "./rats/collections/Table.tsx"

interface TanstackTableProps {
  // biome-ignore lint:
  table: TanstackTable<any>
  sorting: TanstackSortingState
}

function useTanstackTableProps({
  table,
  sorting,
}: TanstackTableProps): Pick<TableProps, "sortDescriptor" | "onSortChange"> {
  return {
    sortDescriptor: sorting.length
      ? {
          column: sorting[0]?.id ?? "",
          direction: sorting[0]?.desc ? "descending" : "ascending",
        }
      : undefined,
    onSortChange: (sortDescriptor) => {
      table.setSorting([
        {
          id: `${sortDescriptor.column}`,
          desc: sortDescriptor.direction === "descending",
        },
      ])
    },
  }
}

interface DataTableProps
  extends Omit<TableProps, "sortDescriptor" | "onSortChange">,
    TanstackTableProps {
  ref?: Ref<HTMLTableElement>
}

export const TanstackDataTable = forwardRef(
  (
    { table, sorting, ...props }: DataTableProps,
    ref: ForwardedRef<HTMLTableElement>,
  ) => {
    return (
      <Table
        ref={ref}
        {...useTanstackTableProps({ table, sorting })}
        {...props}
      >
        <TableHeader columns={table.getFlatHeaders()}>
          {(header) => (
            <Column
              id={header.id}
              allowsSorting={header.column.getCanSort()}
              {...header.column.columnDef.meta?.props?.header}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Column>
          )}
        </TableHeader>
        <TableBody items={table.getRowModel().rows}>
          {(row) => (
            <Row columns={row.getVisibleCells()}>
              {(cell) => (
                <Cell
                  textValue={cell.getValue() as string}
                  {...cell.column.columnDef.meta?.props?.cell}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              )}
            </Row>
          )}
        </TableBody>
      </Table>
    )
  },
)

export const VirtualizedTanstackDataTable = forwardRef(
  (
    {
      table,
      virtualizer,
      sorting,
      ...props
    }: DataTableProps & {
      virtualizer: Virtualizer<HTMLTableElement, Element>
    },
    ref: ForwardedRef<HTMLTableElement>,
  ) => {
    const { rows } = table.getRowModel()
    return (
      <Table
        ref={ref}
        className={composeRenderProps(
          props.className,
          () => "grid h-[500px] overflow-auto relative",
        )}
        {...useTanstackTableProps({ table, sorting })}
        {...props}
      >
        <TableHeader className="grid" columns={table.getFlatHeaders()}>
          {(header) => (
            <Column
              id={header.id}
              allowsSorting={header.column.getCanSort()}
              {...header.column.columnDef.meta?.props?.header}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Column>
          )}
        </TableHeader>
        <TableBody
          items={virtualizer.getVirtualItems()}
          className="grid relative"
          style={{ height: Math.round(virtualizer.getTotalSize()) }}
        >
          {(virtualRow) => {
            // biome-ignore lint:
            const row = rows[virtualRow.index] as TanstackRow<any>
            return (
              <Row
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                columns={row.getVisibleCells()}
                className="absolute w-full"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                {(cell) => (
                  <Cell
                    textValue={cell.getValue() as string}
                    {...cell.column.columnDef.meta?.props?.cell}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                )}
              </Row>
            )
          }}
        </TableBody>
      </Table>
    )
  },
)
