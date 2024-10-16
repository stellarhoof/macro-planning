import { Outlet } from "@tanstack/react-router"

import { Document } from "./Document.tsx"

export function Component() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
