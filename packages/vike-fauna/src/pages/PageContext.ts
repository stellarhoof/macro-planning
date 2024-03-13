import { useContext } from "react"
import { createContext } from "react"
import type { PageContext } from "vike/types"

const Context = createContext(null as unknown as PageContext)

export const PageContextProvider = Context.Provider

export function usePageContext<Data = unknown>() {
  return useContext(Context) as PageContext<Data>
}
