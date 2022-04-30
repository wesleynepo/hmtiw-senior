import Cookie from 'js-cookie'
const tokenLocalKey = 'token-senior'

export const setTokenCookie = (token: string) => {
  Cookie.set(tokenLocalKey, token)
}

export const getTokenCookie = () => {
  return Cookie.get(tokenLocalKey) ?? null
}

export const removeTokenCookie = () => {
  Cookie.remove(tokenLocalKey)
}
