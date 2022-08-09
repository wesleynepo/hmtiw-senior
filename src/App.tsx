import { Center, Text, VStack } from '@chakra-ui/react'
import useSound from 'use-sound'
import song from './mao.mp3'
import { motion } from 'framer-motion'

function App() {
  const [play] = useSound(song, { volume: 0.3 })
  play()
  return (
    <Center mt="10%">
      <VStack>
        {' '}
        <Text fontWeight="bold" color="red" fontSize="2xl">
          Deprecated
        </Text>
        <Text fontStyle="italic">
          The project is open source you can host your own!
        </Text>
        <Text>
          I hope you guys have a good day and I wish the best of luck for you!
        </Text>
        <motion.div
          animate={{ rotate: 720 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <Text color="red" fontSize="5xl">
            ★
          </Text>
        </motion.div>
      </VStack>
    </Center>
  )
}

export default App
