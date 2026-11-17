import { AuthForm } from './components/AuthForm'
import { Center, Spinner, VStack } from '@chakra-ui/react'
import { useSeniorContext } from './hooks/useSenior'
import { WorkClock } from './components/WorkClock'
import { PunchMap } from './components/PunchMap'
import { motion } from 'framer-motion'

function App() {
  const { token, loading, todayClockingEvents } = useSeniorContext()

  if (loading)
    return (
      <Center mt="50%">
        <Spinner />
      </Center>
    )

  if (token)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        exit={{ opacity: 0 }}
      >
        <VStack spacing="10" paddingBottom="10">
          <WorkClock />
          <PunchMap events={todayClockingEvents} />
        </VStack>
      </motion.div>
    )

  return (
    <Center display={'column'} mt="10%">
      <AuthForm />
    </Center>
  )
}

export default App
