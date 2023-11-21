import { Help } from "./Help.tsx"
import { Button, Tabs } from "./park-ui/index.ts"

export function App() {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="foods">Foods</Tabs.Trigger>
        <Tabs.Trigger value="recipes">Recipes</Tabs.Trigger>
        <Tabs.Trigger value="meals">Meals</Tabs.Trigger>
        <Tabs.Trigger value="help">Help</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="foods">
        <Button>Foods 🐼!</Button>
      </Tabs.Content>
      <Tabs.Content value="recipes">
        <Button>Recipes 🐼!</Button>
      </Tabs.Content>
      <Tabs.Content value="meals">
        <Button>Meals 🐼!</Button>
      </Tabs.Content>
      <Tabs.Content value="help">
        <Help />
      </Tabs.Content>
    </Tabs.Root>
  )
}
