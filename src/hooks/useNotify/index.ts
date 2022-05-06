import { useToast } from '@chakra-ui/react'

export const useNotify = () => {
  const t = useToast()

  const tokenError = () =>
    t({
      title: 'Token inválido!',
      description: 'O token informado é inválido',
      status: 'error'
    })

  const requestWarning = () =>
    t({
      title: 'Ops..!',
      description: 'Ocorreu um erro ao buscar os dados!',
      status: 'warning'
    })

  const congratulations = () =>
    t({
      title: 'Parabéns',
      description: 'Você já trabalhou o suficiente!',
      status: 'success'
    })

  return {
    tokenError,
    requestWarning,
    congratulations
  }
}
