import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useSeniorContext } from '../../hooks/useSenior'

export const TokenForm = () => {
  const { saveToken } = useSeniorContext()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault()
    saveToken(event.currentTarget.token.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel htmlFor="token">Token de autenticação</FormLabel>
        <Input placeholder="Token" id="token" required />
        <FormHelperText>Token obtido no login na Senior</FormHelperText>
        <Button type="submit">Gravar</Button>
      </FormControl>
    </form>
  )
}
