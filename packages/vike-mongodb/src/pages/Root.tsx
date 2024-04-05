import type { ReactNode } from "react"
import { StrictMode } from "react"
import type { Config, PageContext as VikePageContext } from "vike/types"

import { PageContextProvider } from "./PageContext.js"

const PassThrough = ({ children }: { children?: ReactNode }) => <>{children}</>

export function Root({ context }: { context: VikePageContext }) {
  // https://github.com/vikejs/vike/issues/1532
  const { Page, Layout = PassThrough } = context.config as Config
  return Page ? (
    <StrictMode>
      <PageContextProvider value={context}>
        <Layout>
          <Page />
        </Layout>
      </PageContextProvider>
    </StrictMode>
  ) : null
}
