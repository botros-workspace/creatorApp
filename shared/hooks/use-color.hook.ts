import { useColorModeValue } from '@chakra-ui/react'

export type colors = {
  primaryColor: string
  secondaryColor: string
  menuBackgroundColor: string
  textColor: string
  textOnHover: string
  mainBackground: string
}

export function useColor(): colors {
  return {
    primaryColor: useColorModeValue('#533a71', '#442b48'),
    secondaryColor: '#bf5700',
    menuBackgroundColor: useColorModeValue('#fdf4dc', '#7d5c65'),
    textColor: useColorModeValue('purple.600', '#a799b7'),
    textOnHover: useColorModeValue('#49a078', 'purple.800'),
    mainBackground: useColorModeValue('gray.100', 'gray.600'),
  }
}
