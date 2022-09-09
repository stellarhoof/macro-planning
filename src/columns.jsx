import _ from "lodash/fp"
import React from "react"
import { action, observable } from "mobx"
import {
  useMergeRefs,
  Flex,
  Icon,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  IconButton,
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { useForm, useFormContext, FormProvider } from "react-hook-form"
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti"
import { FaCaretDown, FaCaretRight } from "react-icons/fa"
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"
import { ModalButton } from "./ModalButton.jsx"

const sortingIcons = {
  asc: TiArrowSortedDown,
  desc: TiArrowSortedUp,
  unsorted: TiArrowUnsorted,
}

export const expansionColumn = () => ({
  props: {
    th: ({ table }) => ({
      cursor: "pointer",
      onClick: table.getToggleAllRowsExpandedHandler(),
      sx: { "> svg": { display: "block" } },
    }),
    td: ({ row }) => ({
      cursor: "pointer",
      onClick: row.getToggleExpandedHandler(),
      sx: { "> svg": { display: "block" } },
    }),
  },
  header: ({ table }) =>
    table.getCanSomeRowsExpand() && (
      <Icon
        as={table.getIsAllRowsExpanded() ? FaCaretDown : FaCaretRight}
        color="gray.600"
        boxSize="1.2em"
      />
    ),
  cell: ({ row }) =>
    row.getCanExpand() && (
      <Icon
        as={row.getIsExpanded() ? FaCaretDown : FaCaretRight}
        color="gray.600"
        boxSize="1.1em"
      />
    ),
})

export const filteringColumn = () => {
  let regexp = observable.box(null)
  return {
    cell: ({ cell }) => (
      <span
        dangerouslySetInnerHTML={{
          __html: cell.getValue().replace(regexp.get(), "<mark>$1</mark>"),
        }}
      />
    ),
    header: ({ column }) => (
      <Input
        size="sm"
        variant="flushed"
        borderColor="blue.300"
        value={column.getFilterValue() || ""}
        onInput={action((e) => {
          const value = e.target.value || undefined
          column.setFilterValue(value)
          regexp.set(new RegExp(`(${value})`, "ig"))
        })}
      />
    ),
    props: {
      td: { sx: { mark: { bg: "yellow" } } },
    },
  }
}

export const sortingColumn = () => ({
  header: ({ header: { column } }) => (
    <Flex
      cursor="pointer"
      alignItems="center"
      justifyContent={column.columnDef.isNumeric && "end"}
      onClick={column.getToggleSortingHandler()}
    >
      <span>{_.startCase(column.id)}</span>
      <Icon as={sortingIcons[column.getIsSorted() || "unsorted"]} />
    </Flex>
  ),
})

const Field = React.forwardRef(
  (
    { name, isRequired, label = _.startCase(name), as: As = Input, ...props },
    ref,
  ) => {
    let {
      register,
      formState: { errors },
    } = useFormContext()
    let { onChange, ref: controlRef } = register(name, {
      required: isRequired && "This field is required",
    })
    let merged = useMergeRefs(ref, controlRef)
    return (
      <FormControl onChange={onChange} isInvalid={errors[name]}>
        {!_.isNull(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <As ref={merged} name={name} {...props} />
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    )
  },
)

const Bar = React.forwardRef((props, ref) => (
  <NumberInput ref={ref} {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
))

const Foo = (props) => {
  const form = useForm()

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = (values) =>
    new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })

  return (
    <ModalButton onClose={(close) => !isSubmitting && close()} {...props}>
      {(onClose, ref) => (
        <ModalContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader>
                <Heading>Add Item</Heading>
              </ModalHeader>
              <ModalCloseButton />
              <Flex as={ModalBody} sx={{ gap: 6, flexDirection: "column" }}>
                <Field
                  ref={ref}
                  name="name"
                  label={null}
                  placeholder="Name"
                  isRequired
                />
                <Field name="brand" label={null} placeholder="Brand" />
                <Flex sx={{ gap: 6, flexDirection: "row" }}>
                  <Field as={Bar} name="carbs" isRequired />
                  <Field as={Bar} name="proteins" isRequired />
                  <Field as={Bar} name="fats" isRequired />
                </Flex>
              </Flex>
              <Flex as={ModalFooter} align="end" gap="4" direction="column">
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Add
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </ModalContent>
      )}
    </ModalButton>
  )
}

export const controlColumn = () => ({
  header: (
    <Foo
      as={IconButton}
      icon={<Icon as={MdAddCircle} boxSize="1.2em" />}
      aria-label="Add Item"
      size="xs"
      variant="ghost"
      colorScheme="green"
    />
  ),
  cell: ({ row }) =>
    row.depth === 0 && (
      <IconButton
        icon={<Icon as={MdRemoveCircle} boxSize="1.2em" />}
        aria-label="Remove Item"
        size="xs"
        variant="ghost"
        colorScheme="red"
        onClick={console.info}
      />
    ),
  props: { th: { py: 0 }, td: { py: 0 } },
})
