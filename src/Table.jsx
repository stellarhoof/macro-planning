import React from 'react'
import { Box, Table } from '@chakra-ui/react'

export default ({
  variant,
  size,
  children,
  colorScheme: c = 'gray',
  ...props
}) => (
  <Box
    border="1px solid"
    borderColor={`${c}.300`}
    boxShadow="md"
    borderRadius="base"
    {...props}
  >
    <Table
      sx={{
        th: { minH: '10', whiteSpace: 'nowrap' },
        'td:first-of-type': { fontWeight: 'bold', whiteSpace: 'nowrap' },
        'input[inputmode=decimal]': { w: '20' },
      }}
      {...{ variant, size, colorScheme: c }}
    >
      {children}
    </Table>
  </Box>
)
