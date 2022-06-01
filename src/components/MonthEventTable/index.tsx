import {
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react'
import { useSeniorContext } from '../../hooks/useSenior'

export const MonthEventTable = () => {
  const { monthlyReport } = useSeniorContext()
  const data = monthlyReport()

  const colorRule = (open: boolean, hours: string) =>
    !open && Number(hours) >= 8 ? 'green.400' : 'red.400'

  return (
    <VStack>
      <Text fontWeight="bold" fontSize="3xl">
        Registros do mês
      </Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Pontos do mês vigente</TableCaption>
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Registros</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(
              ({ date, timestamps, totalHours: { hours, open, minutes } }) => (
                <Tr key={date}>
                  <Td>{date}</Td>
                  <Td whiteSpace={{ base: 'break-spaces', md: 'normal' }}>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      divider={
                        <StackDivider
                          borderColor="gray.200"
                          display={{ base: 'none', md: 'flex' }}
                          data-testid="clock-event-divider"
                        />
                      }
                    >
                      {timestamps.map((timestamp) => (
                        <Text key={timestamp}>{timestamp}</Text>
                      ))}
                    </Stack>
                  </Td>
                  <Td color={colorRule(open, hours)}>
                    {open ? 'Incompleto' : `${hours}:${minutes}`}
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
