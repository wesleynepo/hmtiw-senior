import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Logo } from '../Logo'
import { ToggleButton } from '../ToggleButton'
import { ForkMe } from 'fork-me-corner'
import { Link } from 'react-router-dom'
import { useSeniorContext } from '../../hooks/useSenior'

export type TemplateProps = {
  children?: ReactNode
}

export const Template = ({ children }: TemplateProps) => {
  const { token, logout } = useSeniorContext()

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

        <HStack>
          {token && (
            <Button size="sm" variant="ghost" onClick={logout}>
              Sair
            </Button>
          )}
          <ToggleButton />
        </HStack>
      </HStack>
      <ForkMe repo="https://github.com/dmsysop/hmtiw-senior" />
      <Center width="full">{children}</Center>
    </VStack>
  )
}
