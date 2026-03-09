import { type NavigateOptions, type ToOptions } from "@tanstack/react-router"
import { RouterProvider as OriginalRouterProvider } from "react-aria-components"

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions["to"]
    routerOptions: Omit<NavigateOptions, "to">
  }
}

export function RacRouterProvider({ children }: { children: React.ReactNode }) {
  return (
    <OriginalRouterProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      {children}
    </OriginalRouterProvider>
  )
}
