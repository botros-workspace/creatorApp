import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export function useSuccessToast() {
  const toast = useToast()

  return useCallback(
    (title: string, message: string) => {
      toast({
        title,
        description: message,
        status: 'success',
        isClosable: true,
        duration: 3000,
        variant: 'subtle',
        size: 'xs',
      })
    },
    [toast]
  )
}
