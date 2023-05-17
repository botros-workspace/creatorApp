import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export interface StepComponent {
  label: string
  icon: IconType
  component: ReactNode
}
