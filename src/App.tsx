import { TokenForm } from './components/TokenForm'
import { Center, Spinner, VStack } from '@chakra-ui/react'
import { useSeniorContext } from './hooks/useSenior'
import { WorkClock } from './components/WorkClock'

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
      <VStack spacing="100">
        <WorkClock />
      </VStack>
    )

  return (
    <Center mt="10%">
      <TokenForm />
    </Center>
  )
}

export default App
