import { createContext } from 'react'
import { useSenior } from '../hooks/useSenior'

export type SeniorContextType = ReturnType<typeof useSenior>

export const SeniorContext = createContext<SeniorContextType | null>(null)

export type SeniorContextProviderProps = {
  children?: React.ReactNode
}

export const SeniorContextProvider = ({
  children
}: SeniorContextProviderProps) => {
  return (
    <SeniorContext.Provider value={useSenior()}>
      {children}
    </SeniorContext.Provider>
  )
}
