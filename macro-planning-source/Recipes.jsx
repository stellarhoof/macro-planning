import _ from "lodash/fp.js"
// import { action } from "mobx"
import { useState } from "react"
import {
  Td,
  Flex,
  OrderedList,
  // UnorderedList,
  ListItem,
  // Text,
  // Icon,
  // IconButton,
  // Button,
  // ButtonGroup,
  // ModalHeader,
  // ModalCloseButton,
  // ModalBody,
  // ModalFooter,
  // AlertDialogBody,
  // AlertDialogFooter,
  // AlertDialogHeader,
  // AlertDialogCloseButton,
} from "@chakra-ui/react"
// eslint-disable-next-line import/extensions
// import { MdAddCircle, MdEdit, MdRemoveCircle } from "react-icons/md"
// import { genId } from "./util/misc.js"
import { useReaction } from "./util/mobx.js"
import { formatGrams, formatNumber } from "./util/format.js"
import { useTable, Table } from "./components/Table.jsx"
// import { ModalButton } from "./components/ModalButton.jsx"
// import { AlertDialogButton } from "./components/AlertDialogButton.jsx"
import { sortingColumn, filteringColumn, expansionColumn } from "./columns.jsx"

// const AddRecipe = ({ store, form: formProps, ...props }) => {
//   const form = useForm(formProps)
//   const isSubmitting = form.formState.isSubmitting
//   return (
//     <ModalButton onClose={(close) => !isSubmitting && close()} {...props}>
//       {(onClose, ref) => (
//         <FormProvider {...form}>
//           <form
//             onSubmit={form.handleSubmit(
//               action((snap) => store.recipes.push({ id: genId(), ...snap })),
//             )}
//           >
//             <ModalHeader>{props["aria-label"]}</ModalHeader>
//             <ModalCloseButton />
//             <Flex as={ModalBody} sx={{ gap: 6, flexDirection: "column" }}>
//               <Field
//                 ref={ref}
//                 name="name"
//                 label={null}
//                 placeholder="Name"
//                 registerProps={{ required: true }}
//               />
//             </Flex>
//             <ModalFooter as={ButtonGroup}>
//               <Button onClick={onClose}>Cancel</Button>
//               <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
//                 Add
//               </Button>
//             </ModalFooter>
//           </form>
//         </FormProvider>
//       )}
//     </ModalButton>
//   )
// }

// const RemoveRecipe = ({ store, row }) => (
//   <AlertDialogButton
//     as={IconButton}
//     icon={<Icon as={MdRemoveCircle} boxSize="1.2em" />}
//     aria-label="Remove Item"
//     size="xs"
//     variant="ghost"
//     colorScheme="red"
//   >
//     {(onClose, ref) => {
//       const recipe = store.recipes[row.index]
//       const meals = store.getMealsWithRecipe(recipe)
//       return (
//         <>
//           <AlertDialogHeader>Remove Food</AlertDialogHeader>
//           <AlertDialogCloseButton />
//           {_.isEmpty(meals) ? (
//             <AlertDialogBody>
//               <Text>
//                 Are you sure you would like to remove <b>{recipe.name}</b>?
//               </Text>
//             </AlertDialogBody>
//           ) : (
//             <Flex as={AlertDialogBody} sx={{ gap: 4, flexDirection: "column" }}>
//               <Text>
//                 Cannot remove <b>{recipe.name}</b>. It is part of the following
//                 meals:
//               </Text>
//               <UnorderedList>
//                 {meals.map((meal) => (
//                   <ListItem key={meal.name}>{meal.name}</ListItem>
//                 ))}
//               </UnorderedList>
//             </Flex>
//           )}
//           <AlertDialogFooter as={ButtonGroup} spacing="3">
//             <Button ref={ref} onClick={onClose}>
//               Close
//             </Button>
//             {_.isEmpty(meals) && (
//               <Button
//                 colorScheme="red"
//                 onClick={action(() => {
//                   store.recipes.splice(row.index, 1)
//                   onClose()
//                 })}
//               >
//                 Remove
//               </Button>
//             )}
//           </AlertDialogFooter>
//         </>
//       )
//     }}
//   </AlertDialogButton>
// )

const makeColumns = (/* store */) => [
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
    // header: (
    //   <AddRecipe
    //     store={store}
    //     aria-label="Add Recipe"
    //     colorScheme="green"
    //     as={IconButton}
    //     size="xs"
    //     variant="ghost"
    //     icon={<Icon as={MdAddCircle} boxSize="1.2em" />}
    //   />
    // ),
    // cell: (props) => (
    //   <Flex>
    //     <AddRecipe
    //       store={store}
    //       aria-label="Edit Recipe"
    //       colorScheme="blue"
    //       as={IconButton}
    //       size="xs"
    //       variant="ghost"
    //       icon={<Icon as={MdEdit} boxSize="1.2em" />}
    //       form={{ defaultValues: store.recipes[props.row.index] }}
    //       {...props}
    //     />
    //     <RemoveRecipe store={store} {...props} />
    //   </Flex>
    // ),
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
