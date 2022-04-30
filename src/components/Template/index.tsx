import { Center, HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Logo } from '../Logo'
import { ToggleButton } from '../ToggleButton'
import { motion } from 'framer-motion'

export type TemplateProps = {
  children?: ReactNode
}

export const Template = ({ children }: TemplateProps) => (
  <VStack>
    <HStack mt="1rem" justifyContent="space-between" width="90%">
      <Logo />
      <ToggleButton />
    </HStack>
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
