import { Center, Text } from '@chakra-ui/react'
import { useSeniorContext } from '../../hooks/useSenior'

export const WorkClock = () => {
  const { todayWorkingHours } = useSeniorContext()

  return (
    <Center>
      <Text fontSize="9xl">{todayWorkingHours()}</Text>
    </Center>
  )
}
