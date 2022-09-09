import React from "react"
import { useDisclosure, Modal, ModalOverlay, Button } from "@chakra-ui/react"

export const ModalButton = React.forwardRef(
  (
    {
      label,
      modalProps,
      defaultIsOpen,
      children,
      as: As = Button,
      onOpen = (onOpen) => onOpen(),
      onClose = (onClose) => onClose(),
      ...props
    },
    ref,
  ) => {
    const initialRef = React.useRef()
    const { isOpen, ...disclosure } = useDisclosure({ defaultIsOpen })
    const open = () => onOpen(disclosure.onOpen)
    const close = () => onClose(disclosure.onClose)
    return (
      <>
        <As ref={ref} onClick={open} {...props}>
          {label}
        </As>
        <Modal
          isOpen={isOpen}
          onClose={close}
          initialFocusRef={initialRef}
          {...modalProps}
        >
          <ModalOverlay />
          {isOpen && children(close, initialRef)}
        </Modal>
      </>
    )
  },
)
