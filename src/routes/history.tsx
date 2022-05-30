import { Select, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MonthEventTable } from '../components/MonthEventTable'
import { useSeniorContext } from '../hooks/useSenior'

export const History = () => {
  const { monthlyReport } = useSeniorContext()
  const [value, setValue] = useState(-1)
  const date = new Date()

  return (
    <VStack width="full" marginX={{ base: '1rem', md: '5rem' }} paddingY="5rem">
      <Select
        placeholder="Escolha um mês"
        variant="flushed"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      >
        {monthlyReport.map((_, index) => {
          date.setMonth(index)
          return (
            <option key={index} value={index}>
              {date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
            </option>
          )
        })}
      </Select>
      {value >= 0 && <MonthEventTable data={monthlyReport[value]} />}
    </VStack>
  )
}
