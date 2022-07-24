import { observer } from "mobx-react-lite"
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
  Input,
} from "@chakra-ui/react"
import { MdRemoveCircle } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import Table from "./Table.jsx"
import { formatNumber, formatGrams, sum } from "./util.js"

const storeInput = (obj, key) => ({
  value: formatGrams(Math.floor(obj.get(key))),
  onChange: (value) => obj.set(key, parseInt(value) || 0),
})

const calories = (x) => x.carbs * 4 + x.proteins * 4 + x.fats * 9

const macroAmount = (x, key) => Math.round(x.id.get(key) * (x.amount / 100))

const getMealTotal = (meal, key) =>
  sum(meal.foods.map((food) => macroAmount(food, key)))

const getMealsTotal = (meals, key) =>
  sum(meals.map((meal) => getMealTotal(meal, key)))

const MacrosHeaders = () => (
  <>
    <Th isNumeric>Carbs</Th>
    <Th isNumeric>Proteins</Th>
    <Th isNumeric>Fats</Th>
    <Th isNumeric>Calories</Th>
  </>
)

const TdNumberInput = (props) => (
  <Td isNumeric p="0">
    <NumberInput
      size="sm"
      variant="flushed"
      min={0}
      max={500}
      borderColor="blue.300"
      allowMouseWheel
      {...props}
    >
      <NumberInputField textAlign="right" pe="4" ps="4" py="1" />
    </NumberInput>
  </Td>
)

const MealsInfo = observer(({ store }) => {
  const total = {
    carbs: getMealsTotal(store.meals, "carbs"),
    proteins: getMealsTotal(store.meals, "proteins"),
    fats: getMealsTotal(store.meals, "fats"),
  }
  const remaining = {
    carbs: Math.max(0, store.target.carbs - total.carbs),
    proteins: Math.max(0, store.target.proteins - total.proteins),
    fats: Math.max(0, store.target.fats - total.fats),
  }
  return (
    <Table>
      <Thead>
        <Tr>
          <Th></Th>
          <MacrosHeaders />
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Target</Td>
          <TdNumberInput {...storeInput(store.target, "carbs")} />
          <TdNumberInput {...storeInput(store.target, "proteins")} />
          <TdNumberInput {...storeInput(store.target, "fats")} />
          <Td isNumeric>{formatNumber(calories(store.target))}</Td>
        </Tr>
        <Tr>
          <Td>Total</Td>
          <Td isNumeric>{formatGrams(total.carbs)}</Td>
          <Td isNumeric>{formatGrams(total.proteins)}</Td>
          <Td isNumeric>{formatGrams(total.fats)}</Td>
          <Td isNumeric>{formatNumber(calories(total))}</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Remaining</Th>
          <Th isNumeric>{formatGrams(remaining.carbs)}</Th>
          <Th isNumeric>{formatGrams(remaining.proteins)}</Th>
          <Th isNumeric>{formatGrams(remaining.fats)}</Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  )
})

const Meal = observer(({ meal, isSelected, select, remove, ...props }) => {
  const total = {
    carbs: getMealTotal(meal, "carbs"),
    proteins: getMealTotal(meal, "proteins"),
    fats: getMealTotal(meal, "fats"),
  }
  const colorScheme = isSelected ? "green" : "gray"
  return (
    <Table colorScheme={colorScheme} onClick={select} {...props}>
      <Thead>
        <Tr>
          <Th>
            <Stack align="center" direction="row">
              <Box>{meal.name}</Box>
              <IconButton
                aria-label="Remove"
                size="sm"
                variant="ghost"
                colorScheme={colorScheme}
                icon={<Icon as={IoClose} />}
                onClick={remove}
              />
            </Stack>
          </Th>
          <MacrosHeaders />
          <Th isNumeric>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {meal.foods.map((food, index) => {
          const macros = {
            carbs: macroAmount(food, "carbs"),
            proteins: macroAmount(food, "proteins"),
            fats: macroAmount(food, "fats"),
          }
          return (
            <Tr key={index}>
              <Td
                cursor="pointer"
                onClick={() => meal.removeFood(index)}
                sx={{ ":hover": { bg: `${colorScheme}.100` } }}
              >
                <Stack direction="row" align="center">
                  <Icon as={MdRemoveCircle} color="red.400" />
                  <span>{food.id.name}</span>
                </Stack>
              </Td>
              <Td isNumeric>{formatGrams(macros.carbs)}</Td>
              <Td isNumeric>{formatGrams(macros.proteins)}</Td>
              <Td isNumeric>{formatGrams(macros.fats)}</Td>
              <Td isNumeric>{formatNumber(calories(macros))}</Td>
              <TdNumberInput {...storeInput(food, "amount")} />
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total</Th>
          <Th isNumeric>{formatGrams(total.carbs)}</Th>
          <Th isNumeric>{formatGrams(total.proteins)}</Th>
          <Th isNumeric>{formatGrams(total.fats)}</Th>
          <Th isNumeric>{formatNumber(calories(total))}</Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  )
})

export default observer(({ store, ...props }) => (
  <Stack spacing="4" w="100ch" sx={{ "> *": { flexShrink: 0 } }} {...props}>
    <MealsInfo store={store} />
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target
        const name = new FormData(form).get("name")
        if (name) {
          store.addMeal({ name, foods: [] })
          form.reset()
        }
      }}
    >
      <Input
        size="sm"
        name="name"
        autoComplete="off"
        placeholder="Add Meal..."
      />
    </chakra.form>
    {store.meals.map((meal, index) => (
      <Meal
        key={index}
        meal={meal}
        cursor="pointer"
        isSelected={store.currentMeal === index}
        select={() => store.selectMeal(index)}
        remove={(e) => {
          e.stopPropagation()
          store.removeMeal(index)
        }}
      />
    ))}
  </Stack>
))
