import { Center, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Logo } from '../Logo'
import { ToggleButton } from '../ToggleButton'
import { motion } from 'framer-motion'
import { ForkMe } from 'fork-me-corner'

export type TemplateProps = {
  children?: ReactNode
}

export const Template = ({ children }: TemplateProps) => (
  <VStack>
    <HStack
      mt="1rem"
      justifyContent="space-between"
      width={{ base: '50%', md: '90%' }}
    >
      <HStack>
        <Logo />
        <Link href="/historico">
          <Text>Histórico</Text>
        </Link>
      </HStack>

      <ToggleButton />
    </HStack>
    <ForkMe repo="https://github.com/wesleynepo/hmtiw-senior" />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      exit={{ opacity: 0 }}
    >
      <Center>{children}</Center>
    </motion.div>
  </VStack>
)
