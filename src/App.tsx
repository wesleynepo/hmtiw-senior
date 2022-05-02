import { TokenForm } from './components/TokenForm'
import { Center, VStack } from '@chakra-ui/react'
import { useSeniorContext } from './hooks/useSenior'
import { WorkClock } from './components/WorkClock'
import { MonthEventTable } from './components/MonthEventTable'

function App() {
  const { token } = useSeniorContext()

  if (token)
    return (
      <VStack spacing="100">
        <WorkClock />
        <MonthEventTable />
      </VStack>
    )

  return (
    <div>
      <header>
        <Center mt="10%">
          <TokenForm />
        </Center>
        {token}
      </header>
    </div>
  )
}

export default App
