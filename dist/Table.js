import React from "../_snowpack/pkg/react.js";
import {Box, Table} from "../_snowpack/pkg/@chakra-ui/react.js";
export default ({
  variant,
  size,
  children,
  colorScheme: c = "gray",
  ...props
}) => /* @__PURE__ */ React.createElement(Box, {
  border: "1px solid",
  borderColor: `${c}.300`,
  boxShadow: "md",
  borderRadius: "base",
  ...props
}, /* @__PURE__ */ React.createElement(Table, {
  sx: {
    th: {minH: "10", whiteSpace: "nowrap"},
    "td:first-of-type": {fontWeight: "bold", whiteSpace: "nowrap"},
    "input[inputmode=decimal]": {w: "20"}
  },
  ...{variant, size, colorScheme: c}
}, children));
