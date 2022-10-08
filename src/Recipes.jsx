import _ from "lodash/fp"
import { action } from "mobx"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import {
  Td,
  Flex,
  OrderedList,
  UnorderedList,
  ListItem,
  Text,
  Icon,
  IconButton,
  Button,
  ButtonGroup,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
} from "@chakra-ui/react"
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"
import { genId, formatGrams, formatNumber, useReaction } from "./util.js"
import { useTable, Table } from "./components/Table.jsx"
import { ModalButton } from "./components/ModalButton.jsx"
import { AlertDialogButton } from "./components/AlertDialogButton"
import { sortingColumn, filteringColumn, expansionColumn } from "./columns.jsx"

const AddRecipe = ({ store }) => {
  const form = useForm()
  const isSubmitting = form.formState.isSubmitting
  return (
    <ModalButton
      onClose={(close) => !isSubmitting && close()}
      as={IconButton}
      icon={<Icon as={MdAddCircle} boxSize="1.2em" />}
      aria-label="Add Item"
      size="xs"
      variant="ghost"
      colorScheme="green"
    >
      {(onClose, ref) => (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(
              action((snap) => store.recipes.push({ id: genId(), ...snap })),
            )}
          >
            <ModalHeader>Add Recipe</ModalHeader>
            <ModalCloseButton />
            <Flex as={ModalBody} sx={{ gap: 6, flexDirection: "column" }}>
              <span ref={ref}>Hey</span>
            </Flex>
            <ModalFooter as={ButtonGroup}>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Add
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      )}
    </ModalButton>
  )
}

const RemoveRecipe = ({ store, row }) => (
  <AlertDialogButton
    as={IconButton}
    icon={<Icon as={MdRemoveCircle} boxSize="1.2em" />}
    aria-label="Remove Item"
    size="xs"
    variant="ghost"
    colorScheme="red"
  >
    {(onClose, ref) => {
      const recipe = store.recipes[row.index]
      const meals = store.getMealsWithRecipe(recipe)
      return (
        <>
          <AlertDialogHeader>Remove Food</AlertDialogHeader>
          <AlertDialogCloseButton />
          {_.isEmpty(meals) ? (
            <AlertDialogBody>
              <Text>
                Are you sure you would like to remove <b>{recipe.name}</b>?
              </Text>
            </AlertDialogBody>
          ) : (
            <Flex as={AlertDialogBody} sx={{ gap: 4, flexDirection: "column" }}>
              <Text>
                Cannot remove <b>{recipe.name}</b>. It is part of the following
                meals:
              </Text>
              <UnorderedList>
                {meals.map((meal) => (
                  <ListItem key={meal.name}>{meal.name}</ListItem>
                ))}
              </UnorderedList>
            </Flex>
          )}
          <AlertDialogFooter as={ButtonGroup} spacing="3">
            <Button ref={ref} onClick={onClose}>
              Close
            </Button>
            {_.isEmpty(meals) && (
              <Button
                colorScheme="red"
                onClick={action(() => {
                  store.recipes.splice(row.index, 1)
                  onClose()
                })}
              >
                Remove
              </Button>
            )}
          </AlertDialogFooter>
        </>
      )
    }}
  </AlertDialogButton>
)

const makeColumns = (store) => [
  _.merge(expansionColumn(), {
    id: "expansion",
  }),
  _.merge(filteringColumn(), {
    accessorKey: "name",
    props: { td: { w: "100%", fontWeight: "bold" } },
  }),
  _.merge(sortingColumn(), {
    accessorKey: "amount",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "carbs",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "proteins",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "fats",
    display: formatGrams,
    isNumeric: true,
  }),
  _.merge(sortingColumn(), {
    accessorKey: "calories",
    display: formatNumber,
    isNumeric: true,
  }),
  {
    id: "control",
    header: <AddRecipe store={store} />,
    cell: (props) => <RemoveRecipe store={store} {...props} />,
    props: { th: { py: 0 }, td: { py: 0 } },
  },
]

const renderExpandedRow = ({ row }) => {
  const table = useTable({
    data: row.original.ingredients,
    columns: [
      { accessorKey: "id", header: "name", display: _.get("name") },
      { accessorKey: "amount", isNumeric: true, display: formatGrams },
      { accessorKey: "carbs", isNumeric: true, display: formatGrams },
      { accessorKey: "proteins", isNumeric: true, display: formatGrams },
      { accessorKey: "fats", isNumeric: true, display: formatGrams },
      { accessorKey: "calories", isNumeric: true, display: formatGrams },
    ],
  })
  return (
    <Td colSpan={row.getVisibleCells().length} sx={{ p: 0 }}>
      <Flex
        gap="4"
        align="start"
        sx={{
          py: "4",
          pl: "8",
          bg: "gray.50",
          border: "1px solid",
          borderColor: "gray.200",
        }}
      >
        <OrderedList
          stylePosition="inside"
          sx={{
            ms: "0",
            flexBasis: "150%",
            lineHeight: "tall",
            "> li::marker": { fontWeight: "bold" },
          }}
        >
          {row.original.steps?.map((step) => (
            <ListItem key={step}>{step}</ListItem>
          ))}
        </OrderedList>
        <Table table={table} />
      </Flex>
    </Td>
  )
}

export const Recipes = ({ store, ...props }) => {
  const [columns] = useState(() => makeColumns(store))
  const [data, setData] = useState([])
  useReaction(() => [...store.recipes], setData, { fireImmediately: true })
  const table = useTable({
    data,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
    expanded: {},
    getRowCanExpand: () => true,
  })
  return (
    <Table table={table} renderExpandedRow={renderExpandedRow} {...props} />
  )
}
