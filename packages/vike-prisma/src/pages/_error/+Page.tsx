import { usePageContext } from "#pages/PageContext.js"

export function Page() {
  const context = usePageContext()
  const abortReason =
    (context.abortReason as string) ??
    (context.is404 ? "Page not found." : "Something went wrong.")
  return <p>{abortReason}</p>
}
