import type { ReactNode } from "react"
import {
  type CellProps,
  type ColumnProps,
  TableBody,
  type TableProps,
} from "react-aria-components"

import { startCase } from "#lib/util.js"
import { Cell, Column, Row, Table, TableHeader } from "./rats/Table.jsx"

type Key = PropertyKey

type UnknownRec = Record<Key, unknown>

export interface TColumnContext<TVal, TRow extends UnknownRec> {
  column: TColumn<TVal, TRow>
}

export interface TCellContext<TVal, TRow extends UnknownRec> {
  row: TRow
  value: TVal
  column: TColumn<TVal, TRow>
}

export interface TColumn<TVal, TRow extends UnknownRec> {
  label?: React.ReactNode
  props?: { column?: ColumnProps; cell?: CellProps }
  column?: (context: TColumnContext<TVal, TRow>) => ReactNode
  cell?: (context: TCellContext<TVal, TRow>) => ReactNode
}

export type TColumns<TRow extends UnknownRec> = {
  [K in keyof TRow]?: TColumn<TRow[K], TRow>
}

interface Props<TRow extends UnknownRec> extends TableProps {
  columns: TColumns<TRow>
  rows: TRow[]
}

export function DataTable<TRow extends Record<string, unknown>>({
  rows,
  columns,
  ...props
}: Props<TRow>) {
  const defs = Object.entries(columns).map(([id, col]) => ({
    id,
    label: startCase(id),
    ...col,
  }))
  return (
    <Table {...props}>
      <TableHeader columns={defs}>
        {(column) => (
          <Column {...column.props?.column}>
            {column.column?.({ column }) ?? column.label}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => (
          <Row columns={defs}>
            {(column) => {
              const value = row[column.id]
              return (
                <Cell {...column.props?.cell}>
                  {column.cell?.({ value, row, column }) ?? value?.toString()}
                </Cell>
              )
            }}
          </Row>
        )}
      </TableBody>
    </Table>
  )
}
