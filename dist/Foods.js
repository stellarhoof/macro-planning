import React from "./pkg/react.js";
import {useTable, useFilters, useSortBy} from "./pkg/react-table.js";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Input,
  Stack,
  Box
} from "./pkg/@chakra-ui/react.js";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp
} from "./pkg/react-icons/ti.js";
import {IoAddCircle} from "./pkg/react-icons/io5.js";
import Table from "./Table.js";
import {formatGrams} from "./util.js";
let columns = [
  {accessor: "id"},
  {
    accessor: "name",
    Header: "",
    disableSortBy: true,
    Cell: ({value}) => /* @__PURE__ */ React.createElement(Stack, {
      align: "center",
      direction: "row"
    }, /* @__PURE__ */ React.createElement(Icon, {
      as: IoAddCircle,
      color: "green.400"
    }), /* @__PURE__ */ React.createElement(Box, null, value)),
    Filter: ({column}) => /* @__PURE__ */ React.createElement(Input, {
      size: "sm",
      variant: "flushed",
      borderColor: "blue.300",
      value: column.filterValue || "",
      onChange: (e) => column.setFilter(e.target.value || void 0)
    })
  },
  {
    accessor: "carbs",
    Header: "Carbs",
    isNumeric: true,
    Cell: ({value}) => formatGrams(value)
  },
  {
    accessor: "proteins",
    Header: "Proteins",
    isNumeric: true,
    Cell: ({value}) => formatGrams(value)
  },
  {
    accessor: "fats",
    Header: "Fats",
    isNumeric: true,
    Cell: ({value}) => formatGrams(value)
  }
];
let rowProps = (store, row) => ({
  cursor: "pointer",
  sx: {":hover": {bg: "gray.100"}},
  onClick() {
    let meal = store.meals[store.currentMeal];
    if (meal)
      meal.addFood(row.values);
  }
});
export default ({store, ...props}) => {
  let table = useTable({
    columns,
    data: store.foods,
    initialState: {
      pageSize: 20,
      sortBy: [{id: "carbs", desc: true}],
      hiddenColumns: ["id"]
    }
  }, useFilters, useSortBy);
  let {getTableBodyProps, headerGroups, prepareRow, rows} = table;
  rows.forEach(prepareRow);
  return /* @__PURE__ */ React.createElement(Table, {
    sx: {
      tr: {pos: "relative"},
      th: {
        pos: "sticky",
        top: 0,
        zIndex: 1
      }
    },
    ...props
  }, /* @__PURE__ */ React.createElement(Thead, null, headerGroups.map((headerGroup) => /* @__PURE__ */ React.createElement(Tr, {
    ...headerGroup.getHeaderGroupProps()
  }, headerGroup.headers.map((column) => /* @__PURE__ */ React.createElement(Th, {
    isNumeric: column.isNumeric,
    ...column.getHeaderProps(column.canSort && {
      cursor: "pointer",
      onClick: () => column.toggleSortBy(column.isSortedDesc ? false : true)
    })
  }, /* @__PURE__ */ React.createElement(Stack, {
    direction: "row",
    justify: "space-between",
    align: "center",
    spacing: "0"
  }, column.canFilter && column.Filter && column.render("Filter"), /* @__PURE__ */ React.createElement("span", null, column.render("Header")), column.canSort && /* @__PURE__ */ React.createElement(Icon, {
    as: !column.isSorted ? TiArrowUnsorted : column.isSortedDesc ? TiArrowSortedDown : TiArrowSortedUp
  }))))))), /* @__PURE__ */ React.createElement(Tbody, {
    ...getTableBodyProps()
  }, rows.map((row) => /* @__PURE__ */ React.createElement(Tr, {
    ...row.getRowProps(rowProps(store, row))
  }, row.cells.map((cell) => /* @__PURE__ */ React.createElement(Td, {
    isNumeric: cell.column.isNumeric,
    ...cell.getCellProps()
  }, cell.render("Cell")))))));
};
