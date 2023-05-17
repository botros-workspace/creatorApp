import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

export function useErrorToast() {
    const toast = useToast();

    return useCallback(
        (title: string, message: string) => {
            toast({
                title: `Error: ${title}`,
                description: message,
                status: 'error',
                isClosable: true,
                duration: null,
                variant: 'subtle',
                size: 'xs',
            });
        },
        [toast]
    );
}
