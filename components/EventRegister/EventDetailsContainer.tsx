import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import ImagePicker from './ImagePicker'
import DescriptionPicker from './DescriptionPicker'

const EventDetailsContainer: FunctionComponent = () => {
  return (
    <Flex w={'100%'} h={'100%'} flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        w={{ base: '100%', lg: '50%' }}
        h={'100%'}
        flexDir={'column'}
        gap={2}
      >
        <ImagePicker />
      </Flex>
      <Flex
        w={{ base: '100%', lg: '50%' }}
        h={'100%'}
        flexDir={'column'}
        gap={2}
      >
        <DescriptionPicker />
      </Flex>
    </Flex>
  )
}

export default EventDetailsContainer
