import { Iterator } from "iterator-helpers-polyfill"
import type { ReactNode } from "react"

import { startCase } from "es-toolkit"
import { Menu, MenuItem, type MenuProps } from "./rats/collections/Menu.tsx"

export type DataMenuItem = {
  id: string
  label?: ReactNode
  onSelect: (item: DataMenuItem) => void
}

interface DataMenuProps<T extends DataMenuItem> extends MenuProps<T> {
  items?: Iterable<T>
}

export function DataMenu<T extends DataMenuItem>({
  items,
  ...props
}: DataMenuProps<T>) {
  const it = Iterator.from(items ?? []).map((item) => ({
    label: startCase(item.id),
    ...item,
  }))
  return (
    <Menu
      items={it}
      onAction={(id) => {
        const item = it.find((x) => x.id === id)
        if (item) item.onSelect(item)
      }}
      {...props}
    >
      {(item) => <MenuItem>{item.label}</MenuItem>}
    </Menu>
  )
}
