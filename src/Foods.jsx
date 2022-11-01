import _ from "lodash/fp"
import { action } from "mobx"
import { useRef, useState } from "react"
import {
  Flex,
  Icon,
  IconButton,
  Text,
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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import { MdEdit, MdAddCircle, MdRemoveCircle } from "react-icons/md"
import { formatGrams } from "./util/format.js"
import { useReaction } from "./util/mobx.js"
import { useTable, Table } from "./components/Table.jsx"
import { ModalButton } from "./components/ModalButton.jsx"
import { AlertDialogButton } from "./components/AlertDialogButton"
import { filteringColumn, sortingColumn } from "./columns.jsx"

/*
<FormProvider {...form}>
  <form
    onSubmit={form.handleSubmit(
      action((snap) => store.foods.push({ id: genId(), ...snap })),
    )}
  >
    <ModalHeader>{props["aria-label"]}</ModalHeader>
    <ModalCloseButton />
    <Flex as={ModalBody} sx={{ gap: 6, flexDirection: "column" }}>
      <Field
        ref={ref}
        name="name"
        label={null}
        placeholder="Name"
        registerProps={{ required: true }}
      />
      <Field name="brand" label={null} placeholder="Brand" />
      <Flex sx={{ gap: 6, flexDirection: "row" }}>
        <Field
          as={NumberInput}
          name="carbs"
          registerProps={{ required: true, valueAsNumber: true }}
        />
        <Field
          as={NumberInput}
          name="proteins"
          registerProps={{ required: true, valueAsNumber: true }}
        />
        <Field
          as={NumberInput}
          name="fats"
          registerProps={{ required: true, valueAsNumber: true }}
        />
      </Flex>
    </Flex>
    <ModalFooter as={ButtonGroup}>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
        Add
      </Button>
    </ModalFooter>
  </form>
</FormProvider>
*/

const Foo = ({ onClose }) => {
  const form = useRef()
  return (
    <>
      <ModalCloseButton />
      <ModalHeader>Todo</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter as={ButtonGroup}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          colorScheme="blue"
          onClick={() => form.current.submit()}
        >
          Add
        </Button>
      </ModalFooter>
    </>
  )
}

const AddFood = ({ store, form: formProps, ...props }) => (
  <ModalButton {...props}>{(onClose) => <Foo onClose={onClose} />}</ModalButton>
)

const RemoveFood = ({ store, row }) => (
  <AlertDialogButton
    as={IconButton}
    icon={<Icon as={MdRemoveCircle} boxSize="1.2em" />}
    aria-label="Remove Item"
    size="xs"
    variant="ghost"
    colorScheme="red"
  >
    {(onClose, ref) => {
      const food = store.foods[row.index]
      const meals = store.getMealsWithFood(food)
      return (
        <>
          <AlertDialogHeader>Remove Food</AlertDialogHeader>
          <AlertDialogCloseButton />
          {_.isEmpty(meals) ? (
            <AlertDialogBody>
              <Text>
                Are you sure you would like to remove <b>{food.name}</b>?
              </Text>
            </AlertDialogBody>
          ) : (
            <Flex as={AlertDialogBody} sx={{ gap: 4, flexDirection: "column" }}>
              <Text>
                Cannot remove <b>{food.name}</b>. It is part of the following
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
                  store.foods.splice(row.index, 1)
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
  _.merge(sortingColumn(), {
    accessorKey: "brand",
    props: { td: { whiteSpace: "nowrap" } },
  }),
  _.merge(filteringColumn(), {
    accessorKey: "name",
    props: { td: { w: "100%", whiteSpace: "nowrap" } },
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
  {
    id: "control",
    header: (
      <AddFood
        store={store}
        aria-label="Add Food"
        colorScheme="green"
        as={IconButton}
        size="xs"
        variant="ghost"
        icon={<Icon as={MdAddCircle} boxSize="1.2em" />}
      />
    ),
    cell: (props) => (
      <Flex>
        <AddFood
          store={store}
          aria-label="Edit Food"
          colorScheme="blue"
          as={IconButton}
          size="xs"
          variant="ghost"
          icon={<Icon as={MdEdit} boxSize="1.2em" />}
          form={{ defaultValues: store.foods[props.row.index] }}
          {...props}
        />
        <RemoveFood store={store} {...props} />
      </Flex>
    ),
    props: { th: { py: 0 }, td: { py: 0 } },
  },
]

export const Foods = ({ store, ...props }) => {
  const [columns] = useState(() => makeColumns(store))
  const [data, setData] = useState([])
  useReaction(() => [...store.foods], setData, { fireImmediately: true })
  const table = useTable({
    data,
    columns,
    filtering: true,
    sorting: [{ id: "name", asc: true }],
  })
  return <Table table={table} {...props} />
}
