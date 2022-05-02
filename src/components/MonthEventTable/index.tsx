import {
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

  const colorRule = (open: boolean, hours: number) =>
    !open && hours >= 8 ? 'green.400' : 'red.400'

  const f = (number: number) => number.toString().padStart(2, '0')

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
            {data.map(({ date, timestamps, totalHours }) => (
              <Tr key={date}>
                <Td>{date}</Td>
                <Td whiteSpace={{ base: 'break-spaces', md: 'normal' }}>
                  {timestamps}
                </Td>
                <Td color={colorRule(totalHours.open, totalHours.hours)}>
                  {totalHours.open
                    ? 'Incompleto'
                    : `${f(totalHours.hours)}:${f(totalHours.minutes)}`}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
