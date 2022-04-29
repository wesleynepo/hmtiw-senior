import { TokenForm } from './components/TokenForm'
import { Center } from '@chakra-ui/react'
import { useSeniorContext } from './hooks/useSenior'
import { WorkClock } from './components/WorkClock'

function App() {
  const { token } = useSeniorContext()

  if (token) return <WorkClock />

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
