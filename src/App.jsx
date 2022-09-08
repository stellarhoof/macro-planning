import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import { Foods } from "./Foods.jsx"
import { Meals } from "./Meals.jsx"
import { Help } from "./Help.jsx"

export const App = observer(({ store }) => (
  <Flex
    as={Tabs}
    variant="enclosed-colored"
    colorScheme="blue"
    index={store.tab}
    onChange={action((i) => (store.tab = i))}
    sx={{ h: "100vh", flexDirection: "column" }}
  >
    <TabList
      sx={{
        pos: "sticky",
        top: 0,
        zIndex: 2,
        w: "100%",
        bg: "gray.200",
        "> *": { color: "gray.600", fontWeight: "bold" },
      }}
    >
      <Tab>Meals</Tab>
      <Tab>Foods</Tab>
      <Tab>Help</Tab>
    </TabList>
    <TabPanels
      sx={{
        p: 4,
        flex: 1,
        overflow: "scroll",
        ".table-wrapper": {
          p: 0,
          bg: "white",
          h: "fit-content",
          maxH: "100%",
          overflow: "scroll",
          border: "1px solid",
          borderColor: "gray.200",
          boxShadow: "md",
          borderRadius: "base",
        },
      }}
    >
      <TabPanel className="table-wrapper">
        <Meals store={store} />
      </TabPanel>
      <TabPanel className="table-wrapper">
        <Foods store={store} />
      </TabPanel>
      <TabPanel>
        <Help />
      </TabPanel>
    </TabPanels>
  </Flex>
))
