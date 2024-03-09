import { ReactNode } from "react"
import {
  CellProps,
  ColumnProps,
  TableBody,
  TableProps,
} from "react-aria-components"

import { Cell, Column, Row, Table, TableHeader } from "./rats/Table.jsx"

export type ColumnContext<T extends { [k: string]: any } = object> = {
  column: Column<T>
}

export type CellContext<T extends { [k: string]: any } = object> = {
  value: any
  row: T
  column: Column<T>
}

export type Column<T extends { [k: string]: any } = object> = {
  id: string
  label?: string
  props?: { column?: ColumnProps; cell?: CellProps }
  column?: (context: ColumnContext<T>) => ReactNode
  cell?: (context: CellContext<T>) => ReactNode
}

type Props<T extends { [k: string]: any } = object> = TableProps & {
  columns: Column<T>[]
  rows: T[]
}

export function DataTable<T extends { [k: string]: any } = object>({
  rows,
  columns,
  ...props
}: Props<T>) {
  return (
    <Table {...props}>
      <TableHeader columns={columns}>
        {(column) => (
          <Column {...column.props?.column}>
            {column.column?.({ column }) ?? column.label}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => (
          <Row columns={columns}>
            {(column) => {
              const value = row[column.id]
              return (
                <Cell {...column.props?.cell}>
                  {column.cell?.({ value, row, column }) ?? value}
                </Cell>
              )
            }}
          </Row>
        )}
      </TableBody>
    </Table>
  )
}
