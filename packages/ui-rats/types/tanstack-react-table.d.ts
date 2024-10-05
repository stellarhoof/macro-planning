import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    props?: {
      header?: Record<string, unknown>
      cell?: Record<string, unknown>
      footer?: Record<string, unknown>
    }
  }
}
