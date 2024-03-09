import { type ReactNode, useMemo } from "react"

import { Menu, MenuItem } from "./rats/Menu.jsx"

export type DataMenuItem = {
  id: string
  label?: ReactNode
  onSelect: (value: string | number) => void
}

export type DataMenuProps = {
  items?: DataMenuItem[]
  createItems?: () => DataMenuItem[]
}

export function DataMenu({ items: incomingItems, createItems }: DataMenuProps) {
  const items = useMemo(
    () => incomingItems ?? createItems?.() ?? [],
    [incomingItems, createItems],
  )
  return (
    <Menu
      items={items}
      onAction={(key) => items.find((item) => item.id === key)?.onSelect(key)}
    >
      {(item: DataMenuItem) => <MenuItem>{item.id}</MenuItem>}
    </Menu>
  )
}
