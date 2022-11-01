import { useRef, forwardRef } from "react"
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useMergeRefs,
} from "@chakra-ui/react"

export const ModalButton = forwardRef(
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
    const initialRef = useRef()
    const finalRef = useRef()
    const { isOpen, ...disclosure } = useDisclosure({ defaultIsOpen })
    const open = () => onOpen(disclosure.onOpen)
    const close = () => onClose(disclosure.onClose)
    return (
      <>
        <As ref={useMergeRefs(ref, finalRef)} onClick={open} {...props}>
          {label}
        </As>
        <Modal
          isOpen={isOpen}
          onClose={close}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          {...modalProps}
        >
          <ModalOverlay />
          <ModalContent>{isOpen && children(close, initialRef)}</ModalContent>
        </Modal>
      </>
    )
  }
)
