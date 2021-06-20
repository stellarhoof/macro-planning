import React from "../_snowpack/pkg/react.js";
import {observer} from "../_snowpack/pkg/mobx-react-lite.js";
import {
  chakra,
  Stack,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Icon,
  IconButton,
  Box,
  Input
} from "../_snowpack/pkg/@chakra-ui/react.js";
import {MdRemoveCircle} from "../_snowpack/pkg/react-icons/md.js";
import {IoClose} from "../_snowpack/pkg/react-icons/io5.js";
import Table from "./Table.js";
import {formatNumber, formatGrams, sum} from "./util.js";
let gramsInput = (obj, key) => ({
  value: formatGrams(Math.floor(obj[key])),
  onChange: (value) => obj[key] = parseInt(value)
});
let calories = (x) => x.carbs * 4 + x.proteins * 4 + x.fats * 9;
let macroAmount = (food, key) => Math.round(food.id[key] * (food.amount / 100));
let getMealTotal = (meal, key) => sum(meal.foods.map((food) => macroAmount(food, key)));
let getMealsTotal = (meals, key) => sum(meals.map((meal) => getMealTotal(meal, key)));
let MacrosHeaders = () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Th, {
  isNumeric: true
}, "Carbs"), /* @__PURE__ */ React.createElement(Th, {
  isNumeric: true
}, "Proteins"), /* @__PURE__ */ React.createElement(Th, {
  isNumeric: true
}, "Fats"), /* @__PURE__ */ React.createElement(Th, {
  isNumeric: true
}, "Calories"));
let TdNumberInput = (props) => /* @__PURE__ */ React.createElement(Td, {
  isNumeric: true,
  p: "0"
}, /* @__PURE__ */ React.createElement(NumberInput, {
  size: "sm",
  variant: "flushed",
  min: 0,
  max: 500,
  borderColor: "blue.300",
  allowMouseWheel: true,
  ...props
}, /* @__PURE__ */ React.createElement(NumberInputField, {
  textAlign: "right",
  pe: "4",
  ps: "4",
  py: "1"
})));
let MealsInfo = observer(({store}) => {
  let total = {
    carbs: getMealsTotal(store.meals, "carbs"),
    proteins: getMealsTotal(store.meals, "proteins"),
    fats: getMealsTotal(store.meals, "fats")
  };
  let remaining = {
    carbs: Math.max(0, store.target.carbs - total.carbs),
    proteins: Math.max(0, store.target.proteins - total.proteins),
    fats: Math.max(0, store.target.fats - total.fats)
  };
  return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(MacrosHeaders, null))), /* @__PURE__ */ React.createElement(TableCaption, null, "Summary"), /* @__PURE__ */ React.createElement(Tbody, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, null, "Target"), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...gramsInput(store.target, "carbs")
  }), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...gramsInput(store.target, "proteins")
  }), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...gramsInput(store.target, "fats")
  }), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatNumber(calories(store.target)))), /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, null, "Total"), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(total.carbs)), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(total.proteins)), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(total.fats)), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatNumber(calories(total))))), /* @__PURE__ */ React.createElement(Tfoot, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "Remaining"), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(remaining.carbs)), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(remaining.proteins)), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(remaining.fats)), /* @__PURE__ */ React.createElement(Th, null))));
});
let Meal = observer(({meal, isActive, makeActive, remove, ...props}) => {
  let total = {
    carbs: getMealTotal(meal, "carbs"),
    proteins: getMealTotal(meal, "proteins"),
    fats: getMealTotal(meal, "fats")
  };
  let colorScheme = isActive ? "green" : "gray";
  return /* @__PURE__ */ React.createElement(Table, {
    colorScheme,
    onClick: makeActive,
    ...props
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(MacrosHeaders, null), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, "Amount"))), /* @__PURE__ */ React.createElement(TableCaption, {
    pr: "0",
    pt: "0",
    pb: "0"
  }, /* @__PURE__ */ React.createElement(Stack, {
    justify: "space-between",
    align: "center",
    direction: "row"
  }, /* @__PURE__ */ React.createElement(Box, null, meal.name), /* @__PURE__ */ React.createElement(IconButton, {
    size: "sm",
    colorScheme,
    icon: /* @__PURE__ */ React.createElement(Icon, {
      as: IoClose
    }),
    borderRadius: "0",
    onClick: remove
  }))), /* @__PURE__ */ React.createElement(Tbody, null, meal.foods.map((food, index) => /* @__PURE__ */ React.createElement(Tr, {
    key: index
  }, /* @__PURE__ */ React.createElement(Td, {
    cursor: "pointer",
    onClick: () => meal.foods.splice(index, 1),
    sx: {":hover": {bg: `${colorScheme}.100`}}
  }, /* @__PURE__ */ React.createElement(Stack, {
    direction: "row",
    align: "center"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdRemoveCircle,
    color: "red.400"
  }), /* @__PURE__ */ React.createElement("span", null, food.id.name))), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(macroAmount(food, "carbs"))), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(macroAmount(food, "proteins"))), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatGrams(macroAmount(food, "fats"))), /* @__PURE__ */ React.createElement(Td, {
    isNumeric: true
  }, formatNumber(calories(food.id))), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...gramsInput(food, "amount")
  })))), /* @__PURE__ */ React.createElement(Tfoot, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "Total"), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(total.carbs)), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(total.proteins)), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatGrams(total.fats)), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, formatNumber(calories(total))), /* @__PURE__ */ React.createElement(Th, null))));
});
export default observer(({store, ...props}) => /* @__PURE__ */ React.createElement(Stack, {
  spacing: "4",
  sx: {"> *": {flexShrink: 0}},
  ...props
}, /* @__PURE__ */ React.createElement(MealsInfo, {
  store
}), store.meals.map((meal, index) => /* @__PURE__ */ React.createElement(Meal, {
  key: index,
  meal,
  cursor: "pointer",
  isActive: store.currentMeal === index,
  makeActive: () => {
    store.currentMeal = index;
  },
  remove: (e) => {
    e.stopPropagation();
    store.removeMeal(index);
  }
})), /* @__PURE__ */ React.createElement(chakra.form, {
  onSubmit: (e) => {
    e.preventDefault();
    let form = e.target;
    let name = new FormData(form).get("name");
    if (name) {
      store.addMeal({name});
      form.reset();
    }
  }
}, /* @__PURE__ */ React.createElement(Input, {
  size: "sm",
  name: "name",
  autoComplete: "off",
  placeholder: "Add Meal..."
}))));
