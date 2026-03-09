import { ConvexQueryClient } from "@convex-dev/react-query"
import { ConvexProvider } from "convex/react"

export const convexQueryClient = new ConvexQueryClient(import.meta.env.VITE_CONVEX_URL)

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convexQueryClient.convexClient}>{children}</ConvexProvider>
}
