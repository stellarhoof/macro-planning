import type { Meta, StoryObj } from "@storybook/react"
import { useMemo, useState } from "react"
import type { SortDescriptor } from "react-aria-components"
import { TableBody } from "react-aria-components"

import { Cell, Column, Row, Table, TableHeader } from "./Table.tsx"

export default { component: Table } satisfies Meta<typeof Table>

type Story = StoryObj<typeof Table>

const rows = [
  { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
  { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
  { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
  { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  { id: 5, name: "Proposal.ppt", date: "6/18/2022", type: "PowerPoint file" },
  { id: 6, name: "Taxes.pdf", date: "12/6/2023", type: "PDF Document" },
  { id: 7, name: "Photos", date: "8/2/2021", type: "File folder" },
  { id: 8, name: "Documents", date: "3/18/2023", type: "File folder" },
  { id: 9, name: "Budget.xls", date: "1/6/2024", type: "Excel file" },
]

export const Example: Story = {
  args: {
    selectionMode: "multiple",
  },
  render: (args) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: "name",
      direction: "ascending",
    })

    const items = useMemo(() => {
      const items = rows.slice().sort((a, b) =>
        // @ts-expect-error I'll fix this later
        a[sortDescriptor.column].localeCompare(b[sortDescriptor.column]),
      )
      if (sortDescriptor.direction === "descending") {
        items.reverse()
      }
      return items
    }, [sortDescriptor])

    return (
      <Table
        aria-label="Files"
        {...args}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <Column id="name" isRowHeader allowsSorting>
            Name
          </Column>
          <Column id="type" allowsSorting>
            Type
          </Column>
          <Column id="date" allowsSorting>
            Date Modified
          </Column>
        </TableHeader>
        <TableBody items={items}>
          {(row) => (
            <Row>
              <Cell>{row.name}</Cell>
              <Cell>{row.type}</Cell>
              <Cell>{row.date}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    )
  },
}
