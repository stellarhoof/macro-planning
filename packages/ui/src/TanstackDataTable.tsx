import { flexRender } from "@tanstack/react-table"
import type {
  SortingState as TanstackSortingState,
  Table as TanstackTable,
} from "@tanstack/table-core"
import * as _ from "radashi"
import { TableBody, type TableProps } from "react-aria-components"

import {
  Cell,
  Column,
  Row,
  Table,
  TableHeader,
} from "./rats/collections/Table.tsx"

type UnknownRec = Record<PropertyKey, unknown>

interface TanstackTableProps<T extends UnknownRec> {
  table: TanstackTable<T>
  sorting: TanstackSortingState
}

function useTanstackTableProps<T extends UnknownRec>({
  table,
  sorting,
}: TanstackTableProps<T>): Pick<TableProps, "sortDescriptor" | "onSortChange"> {
  return {
    sortDescriptor: sorting.length
      ? {
          column: sorting[0]?.id,
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

interface DataTableProps<T extends UnknownRec>
  extends Omit<TableProps, "sortDescriptor" | "onSortChange">,
    TanstackTableProps<T> {}

export function TanstackDataTable<T extends UnknownRec>({
  table,
  sorting,
  ...props
}: DataTableProps<T>) {
  return (
    <Table {...useTanstackTableProps({ table, sorting })} {...props}>
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
}
