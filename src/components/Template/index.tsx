import { ReactNode } from 'react'

export type TemplateProps = {
  children?: ReactNode
}

export const Template = ({ children }: TemplateProps) => {
  return <>{children}</>
}
