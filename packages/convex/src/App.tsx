import { useQuery } from "convex/react"

import { api } from "#convex/_generated/api.js"
import { DataTabs } from "#ui/DataTabs.tsx"

import { Foods } from "./Foods.tsx"
import { Help } from "./Help.tsx"

function App() {
  const user = useQuery(api.functions.getUser, {
    email: "admin@email.com",
  })
  return user ? (
    <DataTabs
      defaultSelectedKey="foods"
      tabs={{
        foods: { content: () => <Foods user={user} /> },
        help: { content: () => <Help /> },
      }}
    />
  ) : null
}

export default App
