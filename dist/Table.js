import React from "./pkg/react.js";
import {Box, Table} from "./pkg/@chakra-ui/react.js";
export default ({
  variant,
  size,
  children,
  colorScheme: c = "gray",
  sx = {},
  ...props
}) => /* @__PURE__ */ React.createElement(Box, {
  border: "1px solid",
  borderColor: `${c}.300`,
  boxShadow: "md",
  borderRadius: "base",
  ...props
}, /* @__PURE__ */ React.createElement(Table, {
  sx: {
    ...sx,
    th: {h: "10", whiteSpace: "nowrap", ...sx.th},
    "td:first-of-type, th:first-of-type": {
      fontWeight: "bold",
      whiteSpace: "nowrap",
      w: "40ch"
    },
    "input[inputmode=decimal]": {w: "20"}
  },
  ...{variant, size, colorScheme: c}
}, children));
