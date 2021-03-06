import { Center, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSeniorContext } from '../../hooks/useSenior'

export const WorkClock = () => {
  const {
    todayWorkingHours: { hours, minutes, open },
    todayEvents
  } = useSeniorContext()

  const percent = (Number(hours) / 9) * 100

  const gradientProps = {
    background: `linear-gradient(#6be585, ${percent}%, #dd3e54)`,
    backgroundClip: 'text'
  }

  return (
    <Center flexDir="column">
      <HStack fontSize="9xl" as="div" alignItems="center" {...gradientProps}>
        <Text {...gradientProps}>{hours}</Text>
        <motion.div
          animate={
            open
              ? {
                  opacity: [1, 0],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%']
                }
              : {}
          }
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <Text {...gradientProps}>:</Text>
        </motion.div>
        <Text {...gradientProps}>{minutes}</Text>
      </HStack>
      <Text>{todayEvents}</Text>
    </Center>
  )
}
