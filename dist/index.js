import React from "./pkg/react.js";
import ReactDOM from "./pkg/react-dom.js";
import {ChakraProvider, Stack} from "./pkg/@chakra-ui/react.js";
import {UndoManager} from "./pkg/mst-middlewares.js";
import {onSnapshot} from "./pkg/mobx-state-tree.js";
import model from "./storeModel.js";
import data from "./storeData.js";
import Foods from "./Foods.js";
import Meals from "./Meals.js";
import Help from "./Help.js";
import theme from "./theme.js";
import {onKeyPress} from "./kbd.js";
import {localStorage} from "./util.js";
let storeStorage = localStorage("store");
let store = model.create({...data, ...storeStorage.get()});
onSnapshot(store, ({foods, ...snap}) => storeStorage.set(snap));
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
}), /* @__PURE__ */ React.createElement(Help, {
  store
}))), document.getElementById("root"));
