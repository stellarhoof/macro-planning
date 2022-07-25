import { Box } from "@chakra-ui/react"

export default ({ colorScheme: c = "gray", ...props }) => (
  <Box
    h="fit-content"
    border="1px solid"
    borderColor={`${c}.300`}
    boxShadow="md"
    borderRadius="base"
    {...props}
  />
)
