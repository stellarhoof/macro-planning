import React from 'react'
import { observer } from 'mobx-react-lite'
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
  Input,
} from '@chakra-ui/react'
import { MdRemoveCircle } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import Table from './Table'
import { formatNumber, formatGrams, sum } from './util'

let gramsInput = (obj, key) => ({
  value: formatGrams(Math.floor(obj[key])),
  onChange: value => (obj[key] = parseInt(value)),
})

let calories = x => x.carbs * 4 + x.proteins * 4 + x.fats * 9

let macroAmount = (food, key) => Math.round(food.id[key] * (food.amount / 100))

let getMealTotal = (meal, key) =>
  sum(meal.foods.map(food => macroAmount(food, key)))

let getMealsTotal = (meals, key) =>
  sum(meals.map(meal => getMealTotal(meal, key)))

let MacrosHeaders = () => (
  <>
    <Th isNumeric>Carbs</Th>
    <Th isNumeric>Proteins</Th>
    <Th isNumeric>Fats</Th>
    <Th isNumeric>Calories</Th>
  </>
)

let TdNumberInput = props => (
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

let MealsInfo = observer(({ store }) => {
  let total = {
    carbs: getMealsTotal(store.meals, 'carbs'),
    proteins: getMealsTotal(store.meals, 'proteins'),
    fats: getMealsTotal(store.meals, 'fats'),
  }
  let remaining = {
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
      <TableCaption>Summary</TableCaption>
      <Tbody>
        <Tr>
          <Td>Target</Td>
          <TdNumberInput {...gramsInput(store.target, 'carbs')} />
          <TdNumberInput {...gramsInput(store.target, 'proteins')} />
          <TdNumberInput {...gramsInput(store.target, 'fats')} />
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

let Meal = observer(({ meal, isActive, makeActive, remove, ...props }) => {
  let total = {
    carbs: getMealTotal(meal, 'carbs'),
    proteins: getMealTotal(meal, 'proteins'),
    fats: getMealTotal(meal, 'fats'),
  }
  let colorScheme = isActive ? 'green' : 'gray'
  return (
    <Table colorScheme={colorScheme} onClick={makeActive} {...props}>
      <Thead>
        <Tr>
          <Th></Th>
          <MacrosHeaders />
          <Th isNumeric>Amount</Th>
        </Tr>
      </Thead>
      <TableCaption pr="0" pt="0" pb="0">
        <Stack justify="space-between" align="center" direction="row">
          <Box>{meal.name}</Box>
          <IconButton
            size="sm"
            colorScheme={colorScheme}
            icon={<Icon as={IoClose} />}
            borderRadius="0"
            onClick={remove}
          />
        </Stack>
      </TableCaption>
      <Tbody>
        {meal.foods.map((food, index) => (
          <Tr key={index}>
            <Td
              cursor="pointer"
              onClick={() => meal.foods.splice(index, 1)}
              sx={{ ':hover': { bg: `${colorScheme}.100` } }}
            >
              <Stack direction="row" align="center">
                <Icon as={MdRemoveCircle} color="red.400" />
                <span>{food.id.name}</span>
              </Stack>
            </Td>
            <Td isNumeric>{formatGrams(macroAmount(food, 'carbs'))}</Td>
            <Td isNumeric>{formatGrams(macroAmount(food, 'proteins'))}</Td>
            <Td isNumeric>{formatGrams(macroAmount(food, 'fats'))}</Td>
            <Td isNumeric>{formatNumber(calories(food.id))}</Td>
            <TdNumberInput {...gramsInput(food, 'amount')} />
          </Tr>
        ))}
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
  <Stack spacing="4" sx={{ '> *': { flexShrink: 0 } }} {...props}>
    <MealsInfo store={store} />
    {store.meals.map((meal, index) => (
      <Meal
        key={index}
        meal={meal}
        cursor="pointer"
        isActive={store.currentMeal === index}
        makeActive={() => {
          store.currentMeal = index
        }}
        remove={e => {
          e.stopPropagation()
          store.removeMeal(index)
        }}
      />
    ))}
    <chakra.form
      onSubmit={e => {
        e.preventDefault()
        let form = e.target
        let name = new FormData(form).get('name')
        if (name) {
          store.addMeal({ name })
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
  </Stack>
))
