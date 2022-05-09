import { Center, HStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSeniorContext } from '../../hooks/useSenior'

export const WorkClock = () => {
  const {
    todayWorkingHours: { hours, minutes, open }
  } = useSeniorContext()

  const percent = (Number(hours) / 9) * 100

  const gradientProps = {
    background: `linear-gradient(#6be585, ${percent}%, #dd3e54)`,
    backgroundClip: 'text'
  }

  return (
    <Center>
      <HStack fontSize="9xl" as="div" alignItems="center" {...gradientProps}>
        <Text>{hours}</Text>
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
        <Text>{minutes}</Text>
      </HStack>
    </Center>
  )
}
