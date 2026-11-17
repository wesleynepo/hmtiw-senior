import { AxiosError, AxiosResponse } from 'axios'
import { axiosSenior } from './axios-senior'
import { AuthCredentialRequest, AuthTokenResponse } from './dtos/auth-data'

export const login = async ({ user, password }: AuthCredentialRequest) => {
  try {
    const {
      data: { jsonToken }
    } = await axiosSenior.post<any, AxiosResponse<AuthTokenResponse>>(
      't/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
      { username: user, password }
    )

    return JSON.parse(jsonToken).access_token as string
  } catch (error) {
    return error as AxiosError
  }
}
