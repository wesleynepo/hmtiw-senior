import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { HStack, Heading, IconButton, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MonthEventTable } from '../components/MonthEventTable'
import { useSeniorContext } from '../hooks/useSenior'

export const History = () => {
  const today = new Date()
  const { monthlyReport, year, setYear } = useSeniorContext()
  const [month, setMonth] = useState(today.getMonth())

  // só há dados do ano atual e do anterior
  const isFirst = year === today.getFullYear() - 1 && month === 0
  const isLast = year === today.getFullYear() && month === today.getMonth()

  const go = (step: number) => {
    const target = new Date(year, month + step)
    setYear(target.getFullYear())
    setMonth(target.getMonth())
  }

  return (
    <VStack
      width="full"
      maxW="720px"
      paddingX="4"
      paddingY={{ base: '6', md: '12' }}
      spacing="4"
    >
      <HStack width="full" justifyContent="space-between">
        <IconButton
          aria-label="Mês anterior"
          icon={<ChevronLeftIcon boxSize="6" />}
          variant="ghost"
          borderRadius="full"
          isDisabled={isFirst}
          onClick={() => go(-1)}
        />
        <Heading size="md" textTransform="capitalize">
          {new Date(year, month).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
          })}
        </Heading>
        <IconButton
          aria-label="Próximo mês"
          icon={<ChevronRightIcon boxSize="6" />}
          variant="ghost"
          borderRadius="full"
          isDisabled={isLast}
          onClick={() => go(1)}
        />
      </HStack>

      <MonthEventTable year={year} month={month} data={monthlyReport[month]} />
    </VStack>
  )
}
