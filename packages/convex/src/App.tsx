import { useQuery } from "convex/react"

import { api } from "#convex/_generated/api.js"
import { DataTabs } from "#ui/DataTabs.jsx"

import { Foods } from "./Foods.jsx"
import { Help } from "./Help.jsx"

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
