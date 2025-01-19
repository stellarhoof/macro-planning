import { ScrollRestoration } from "@tanstack/react-router"
import type { ReactNode } from "react"

export function Document({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ScrollRestoration />
    </>
  )
}
