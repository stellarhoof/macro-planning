import { observer } from "mobx-react-lite"
import { Icon, IconButton } from "@chakra-ui/react"
import { MdAdd, MdRemove, MdDragIndicator } from "react-icons/md"

export const AddField = observer(
  ({ field, ...props }) =>
    field.canAddField && (
      <IconButton
        aria-label="Add"
        icon={<Icon as={MdAdd} boxSize="1.2em" />}
        onClick={() => field.addField()}
        {...props}
      />
    )
)

export const RemoveField = observer(
  ({ field, ...props }) =>
    field.parent?.canRemoveField && (
      <IconButton
        aria-label="Remove"
        icon={<Icon as={MdRemove} boxSize="1.2em" />}
        onClick={() => field.parent.removeField(field.name)}
        {...props}
      />
    )
)

export const MoveField = ({ field, ...props }) => (
  <IconButton
    aria-label="Move"
    icon={<Icon as={MdDragIndicator} boxSize="1.2em" />}
    onClick={() => field.parent.moveField(field.name, field.name)}
    sx={{ cursor: "grab" }}
    {...props}
  />
)
