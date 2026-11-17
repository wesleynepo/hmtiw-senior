import {
  Badge,
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { DailyData } from '../../hooks/useSenior/types'
import { MapPinIcon, PunchMap, isLocated } from '../PunchMap'
import {
  minutesPerHour,
  minutesToHoursAndMinutes,
  summarizeDay
} from './summarize'

export type MonthEventTableProps = {
  data: DailyData[]
  year: number
  month: number
}

const formatTime = (date: Date) =>
  date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

// 'red.400' -> 'red', para usar como colorScheme
const scheme = (color: string) => color.split('.')[0]

export const MonthEventTable = ({
  data,
  year,
  month
}: MonthEventTableProps) => {
  const [mapDay, setMapDay] = useState<DailyData | null>(null)
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const mutedColor = useColorModeValue('gray.500', 'gray.400')

  const today = new Date()
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const lastDay = isCurrentMonth ? today.getDate() : daysInMonth

  // mais recente primeiro: é o que se procura com mais frequência
  const days = data
    .filter(({ day }) => day <= lastDay)
    .map((dailyData) => ({
      ...dailyData,
      summary: summarizeDay(year, month, dailyData.day, dailyData.totalHours)
    }))
    .reverse()

  const balanceMinutes = days.reduce(
    (total, { summary }) => total + summary.differenceMinutes,
    0
  )
  const workedMinutes = days.reduce(
    (total, { totalHours: { hours, minutes, open } }) =>
      open ? total : total + Number(hours) * minutesPerHour + Number(minutes),
    0
  )
  const workedDays = days.filter(({ events }) => events.length > 0).length

  const stats = [
    {
      label: 'Trabalhado',
      value: minutesToHoursAndMinutes(workedMinutes),
      color: undefined
    },
    {
      label: 'Saldo',
      value:
        (balanceMinutes < 0 ? '-' : '+') +
        minutesToHoursAndMinutes(balanceMinutes),
      color: balanceMinutes < 0 ? 'red.400' : 'green.400'
    },
    { label: 'Dias', value: String(workedDays), color: undefined }
  ]

  return (
    <VStack width="full" spacing="3">
      <SimpleGrid columns={3} spacing="3" width="full">
        {stats.map(({ label, value, color }) => (
          <Stat
            key={label}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            padding="3"
            textAlign="center"
          >
            <StatLabel color={mutedColor}>{label}</StatLabel>
            <StatNumber color={color} fontSize={{ base: 'xl', md: '2xl' }}>
              {value}
            </StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      {days.map((dailyData) => {
        const {
          day,
          events,
          summary,
          totalHours: { hours, minutes, open }
        } = dailyData
        const date = new Date(year, month, day)
        const isToday = isCurrentMonth && day === today.getDate()
        const empty = events.length === 0

        return (
          <Flex
            key={day}
            width="full"
            alignItems="center"
            gap="3"
            bg={cardBg}
            borderWidth="1px"
            borderColor={isToday ? 'green.400' : borderColor}
            borderRadius="xl"
            paddingX="3"
            paddingY={empty ? '1' : '3'}
            opacity={empty ? 0.6 : 1}
          >
            <VStack spacing="0" minW="10">
              <Text fontSize={empty ? 'md' : 'xl'} fontWeight="bold">
                {day}
              </Text>
              <Text fontSize="xs" color={mutedColor} textTransform="uppercase">
                {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </Text>
            </VStack>

            <Box flex="1">
              {empty ? (
                <Text fontSize="sm" color={mutedColor}>
                  {summary.differenceLabel || 'Sem registros'}
                </Text>
              ) : (
                <Wrap spacing="1">
                  {events.map((event, index) => (
                    <WrapItem key={event.date.getTime()}>
                      <Badge
                        colorScheme={index % 2 === 0 ? 'green' : 'orange'}
                        variant="subtle"
                        borderRadius="full"
                        paddingX="2"
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        {formatTime(event.date)}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </Box>

            {!empty && (
              <VStack spacing="1" alignItems="flex-end">
                <Text fontWeight="bold" fontSize="lg">
                  {hours}:{minutes}
                </Text>
                {open ? (
                  <Badge colorScheme={isToday ? 'blue' : 'red'}>
                    {isToday ? 'Em andamento' : 'Incompleto'}
                  </Badge>
                ) : (
                  <Badge colorScheme={scheme(summary.color)}>
                    {summary.differenceLabel}
                  </Badge>
                )}
              </VStack>
            )}

            {events.some(isLocated) && (
              <IconButton
                aria-label={`Ver no mapa as batidas do dia ${day}`}
                title="Ver no mapa"
                size="sm"
                variant="ghost"
                colorScheme="green"
                icon={<MapPinIcon />}
                onClick={() => setMapDay(dailyData)}
              />
            )}
          </Flex>
        )
      })}

      <Modal
        isOpen={mapDay !== null}
        onClose={() => setMapDay(null)}
        size="xl"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent marginX="4">
          <ModalHeader textTransform="capitalize">
            {mapDay &&
              new Date(year, month, mapDay.day).toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="6">
            {mapDay && <PunchMap key={mapDay.day} events={mapDay.events} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
