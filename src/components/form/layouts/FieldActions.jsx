import { observer } from "mobx-react-lite"
import { Icon, ButtonGroup, IconButton } from "@chakra-ui/react"
import { MdAdd, MdRemove } from "react-icons/md"

export const FieldActions = observer(
  ({ field }) =>
    (field.addField || field.parent?.removeField) && (
      <ButtonGroup isAttached aria-label="Actions" size="xs">
        {field.canAddField && (
          <IconButton
            aria-label="Add"
            icon={<Icon as={MdAdd} boxSize="1.2em" />}
            onClick={() => field.addField()}
          />
        )}
        {field.parent?.canRemoveField && (
          <IconButton
            aria-label="Remove"
            colorScheme="red"
            icon={<Icon as={MdRemove} boxSize="1.2em" />}
            onClick={() => field.parent.removeField(field.name)}
          />
        )}
      </ButtonGroup>
    )
)
