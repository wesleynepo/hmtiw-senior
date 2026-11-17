import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Wrap,
  WrapItem,
  createIcon,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { ClockingEvent } from '../../hooks/useSenior/types'

export const MapPinIcon = createIcon({
  displayName: 'MapPinIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill="currentColor"
      d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
    />
  )
})

// ~200m de raio em volta do ponto, suficiente pra reconhecer o local
const boxRadius = 0.002

const embedUrl = (latitude: number, longitude: number) =>
  'https://www.openstreetmap.org/export/embed.html?bbox=' +
  [
    longitude - boxRadius,
    latitude - boxRadius,
    longitude + boxRadius,
    latitude + boxRadius
  ].join(',') +
  `&layer=mapnik&marker=${latitude},${longitude}`

export const isLocated = (
  event: ClockingEvent
): event is Required<ClockingEvent> =>
  event.latitude !== undefined && event.longitude !== undefined

const formatTime = (date: Date) =>
  date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

export type PunchMapProps = {
  events: ClockingEvent[]
}

export const PunchMap = ({ events }: PunchMapProps) => {
  const firstLocated = events.findIndex(isLocated)
  const [selected, setSelected] = useState(firstLocated)
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  if (firstLocated === -1) return null

  const current = events[selected] ?? events[firstLocated]
  if (!isLocated(current)) return null
  const { latitude, longitude } = current

  return (
    <Box
      width="full"
      maxW="600px"
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      boxShadow="lg"
      overflow="hidden"
    >
      <Wrap spacing="2" padding="3" justify="center">
        {events.map((event, index) => {
          const entry = index % 2 === 0
          const active = event === current

          return (
            <WrapItem key={event.date.getTime()}>
              <Button
                size="sm"
                borderRadius="full"
                colorScheme={entry ? 'green' : 'orange'}
                variant={active ? 'solid' : 'outline'}
                leftIcon={<MapPinIcon />}
                isDisabled={!isLocated(event)}
                title={isLocated(event) ? undefined : 'Batida sem localização'}
                onClick={() => setSelected(index)}
              >
                <Text as="span" fontWeight="normal" marginRight="1">
                  {entry ? 'Entrada' : 'Saída'}
                </Text>
                {formatTime(event.date)}
              </Button>
            </WrapItem>
          )
        })}
      </Wrap>

      <Box
        as="iframe"
        title="Local da batida"
        src={embedUrl(latitude, longitude)}
        width="full"
        height="300px"
        border="0"
        display="block"
        loading="lazy"
      />

      <Flex
        justifyContent="flex-end"
        paddingX="3"
        paddingY="2"
        borderTopWidth="1px"
        borderColor={borderColor}
      >
        <Link
          fontSize="sm"
          color="green.400"
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`}
          isExternal
        >
          Abrir no mapa <ExternalLinkIcon marginX="1" />
        </Link>
      </Flex>
    </Box>
  )
}
