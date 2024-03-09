// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface Config {
      Page?: () => React.ReactNode
      Layout?: ({ children }: { children: React.ReactNode }) => React.ReactNode
    }

    interface PageContext {
      Page?: () => React.ReactNode
    }
  }
}
