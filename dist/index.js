import React from "./pkg/react.js";
import ReactDOM from "./pkg/react-dom.js";
import {
  extendTheme,
  ChakraProvider,
  Stack,
  TableCaption
} from "./pkg/@chakra-ui/react.js";
import {configure} from "./pkg/mobx.js";
import {unprotect, onSnapshot} from "./pkg/mobx-state-tree.js";
import dbModel from "./dbModel.js";
import dbData from "./dbData.js";
import Foods from "./Foods.js";
import Meals from "./Meals.js";
let storage = window.localStorage;
let storedDb = storage.getItem("db");
let store = dbModel.create(storedDb ? {...JSON.parse(storedDb), foods: dbData.foods} : dbData);
onSnapshot(store, ({foods, ...snap}) => storage.setItem("db", JSON.stringify(snap)));
configure({enforceActions: "never"});
unprotect(store);
let theme = extendTheme({
  fonts: {body: "monospace"},
  components: {
    Heading: {defaultProps: {size: "sm"}},
    Table: {
      defaultProps: {size: "sm"},
      baseStyle: ({colorScheme: c}) => ({
        caption: {bg: `${c}.100`, m: "0", fontWeight: "bold"},
        tfoot: {bg: `${c}.50`}
      }),
      sizes: {
        sm: {caption: {fontSize: "sm"}}
      }
    }
  }
});
TableCaption.defaultProps = {placement: "top"};
ReactDOM.render(/* @__PURE__ */ React.createElement(ChakraProvider, {
  theme
}, /* @__PURE__ */ React.createElement(Stack, {
  p: "4",
  spacing: "4",
  direction: "row",
  h: "100vh",
  sx: {
    "> *": {
      maxH: "100%",
      overflowY: "scroll",
      flexShrink: 0
    }
  }
}, /* @__PURE__ */ React.createElement(Meals, {
  store
}), /* @__PURE__ */ React.createElement(Foods, {
  store
}))), document.getElementById("root"));
if (void 0) {
  (void 0).accept();
}
