import { Center, Text } from '@chakra-ui/react'
import { useSeniorContext } from '../../hooks/useSenior'

export const WorkClock = () => {
  const { todayWorkingHours } = useSeniorContext()
  const { hours, minutes } = todayWorkingHours()

  const format = (number: number) => number.toString().padStart(2, '0')

  return (
    <Center>
      <Text
        fontSize="9xl"
        color={hours > 8 ? 'green.400' : 'red.400'}
      >{`${format(hours)}:${format(minutes)}`}</Text>
    </Center>
  )
}
