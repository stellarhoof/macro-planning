import { useRef, forwardRef } from "react"
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react"

export const AlertDialogButton = forwardRef(
  (
    {
      label,
      children,
      modalProps,
      defaultIsOpen,
      as: As = Button,
      onOpen = (onOpen) => onOpen(),
      onClose = (onClose) => onClose(),
      ...props
    },
    ref
  ) => {
    const leastDestructiveRef = useRef()
    const finalRef = useRef()
    const { isOpen, ...disclosure } = useDisclosure({ defaultIsOpen })
    const open = () => onOpen(disclosure.onOpen)
    const close = () => onClose(disclosure.onClose)
    return (
      <>
        <As ref={useMergeRefs(ref, finalRef)} onClick={open} {...props}>
          {label}
        </As>
        <AlertDialog
          isOpen={isOpen}
          onClose={close}
          finalFocusRef={finalRef}
          onEsc={close}
          leastDestructiveRef={leastDestructiveRef}
          {...modalProps}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            {isOpen && children(close, leastDestructiveRef)}
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
)
