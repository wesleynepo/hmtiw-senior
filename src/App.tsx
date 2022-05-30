import { TokenForm } from './components/TokenForm'
import { Center, Spinner, VStack } from '@chakra-ui/react'
import { useSeniorContext } from './hooks/useSenior'
import { WorkClock } from './components/WorkClock'
import { motion } from 'framer-motion'

function App() {
  const { token, loading } = useSeniorContext()

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
        <VStack spacing="100">
          <WorkClock />
        </VStack>
      </motion.div>
    )

  return (
    <Center mt="10%">
      <TokenForm />
    </Center>
  )
}

export default App
