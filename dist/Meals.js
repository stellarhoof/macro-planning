import React from "./pkg/react.js";
import {observer} from "./pkg/mobx-react-lite.js";
import {
  chakra,
  Stack,
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
} from "./pkg/@chakra-ui/react.js";
import {MdRemoveCircle} from "./pkg/react-icons/md.js";
import {IoClose} from "./pkg/react-icons/io5.js";
import Table from "./Table.js";
import {formatNumber, formatGrams, sum} from "./util.js";
let storeInput = (obj, key) => ({
  value: formatGrams(Math.floor(obj[key])),
  onChange: (value) => obj.set(key, parseInt(value) || 0)
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
  return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(MacrosHeaders, null))), /* @__PURE__ */ React.createElement(Tbody, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, null, "Target"), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...storeInput(store.target, "carbs")
  }), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...storeInput(store.target, "proteins")
  }), /* @__PURE__ */ React.createElement(TdNumberInput, {
    ...storeInput(store.target, "fats")
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
let Meal = observer(({meal, isSelected, select, remove, ...props}) => {
  let total = {
    carbs: getMealTotal(meal, "carbs"),
    proteins: getMealTotal(meal, "proteins"),
    fats: getMealTotal(meal, "fats")
  };
  let colorScheme = isSelected ? "green" : "gray";
  return /* @__PURE__ */ React.createElement(Table, {
    colorScheme,
    onClick: select,
    ...props
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, /* @__PURE__ */ React.createElement(Stack, {
    align: "center",
    direction: "row"
  }, /* @__PURE__ */ React.createElement(Box, null, meal.name), /* @__PURE__ */ React.createElement(IconButton, {
    size: "sm",
    variant: "ghost",
    colorScheme,
    icon: /* @__PURE__ */ React.createElement(Icon, {
      as: IoClose
    }),
    onClick: remove
  }))), /* @__PURE__ */ React.createElement(MacrosHeaders, null), /* @__PURE__ */ React.createElement(Th, {
    isNumeric: true
  }, "Amount"))), /* @__PURE__ */ React.createElement(Tbody, null, meal.foods.map((food, index) => {
    let macros = {
      carbs: macroAmount(food, "carbs"),
      proteins: macroAmount(food, "proteins"),
      fats: macroAmount(food, "fats")
    };
    return /* @__PURE__ */ React.createElement(Tr, {
      key: index
    }, /* @__PURE__ */ React.createElement(Td, {
      cursor: "pointer",
      onClick: () => meal.removeFood(index),
      sx: {":hover": {bg: `${colorScheme}.100`}}
    }, /* @__PURE__ */ React.createElement(Stack, {
      direction: "row",
      align: "center"
    }, /* @__PURE__ */ React.createElement(Icon, {
      as: MdRemoveCircle,
      color: "red.400"
    }), /* @__PURE__ */ React.createElement("span", null, food.id.name))), /* @__PURE__ */ React.createElement(Td, {
      isNumeric: true
    }, formatGrams(macros.carbs)), /* @__PURE__ */ React.createElement(Td, {
      isNumeric: true
    }, formatGrams(macros.proteins)), /* @__PURE__ */ React.createElement(Td, {
      isNumeric: true
    }, formatGrams(macros.fats)), /* @__PURE__ */ React.createElement(Td, {
      isNumeric: true
    }, formatNumber(calories(macros))), /* @__PURE__ */ React.createElement(TdNumberInput, {
      ...storeInput(food, "amount")
    }));
  })), /* @__PURE__ */ React.createElement(Tfoot, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "Total"), /* @__PURE__ */ React.createElement(Th, {
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
  w: "100ch",
  sx: {"> *": {flexShrink: 0}},
  ...props
}, /* @__PURE__ */ React.createElement(MealsInfo, {
  store
}), /* @__PURE__ */ React.createElement(chakra.form, {
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
})), store.meals.map((meal, index) => /* @__PURE__ */ React.createElement(Meal, {
  key: index,
  meal,
  cursor: "pointer",
  isSelected: store.currentMeal === index,
  select: () => store.selectMeal(index),
  remove: (e) => {
    e.stopPropagation();
    store.removeMeal(index);
  }
}))));
