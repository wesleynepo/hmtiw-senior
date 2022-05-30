import { Center, HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Logo } from '../Logo'
import { ToggleButton } from '../ToggleButton'
import { ForkMe } from 'fork-me-corner'
import { Link } from 'react-router-dom'

export type TemplateProps = {
  children?: ReactNode
}

export const Template = ({ children }: TemplateProps) => {
  return (
    <VStack>
      <HStack
        mt="1rem"
        justifyContent="space-between"
        width={{ base: '50%', md: '90%' }}
      >
        <HStack>
          <Logo />
          <Link to="/historico">
            <Text>Histórico</Text>
          </Link>
        </HStack>

        <ToggleButton />
      </HStack>
      <ForkMe repo="https://github.com/wesleynepo/hmtiw-senior" />
      <Center width="full">{children}</Center>
    </VStack>
  )
}
