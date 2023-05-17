import { Box, Flex } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import GalleryContainer from './GalleryContainer'

const EventDetails: FunctionComponent = () => {
  return (
    <Box w={'100%'} h={'100%'}>
      <Flex w={'100%'} h={'100%'}>
        <Flex w={'50%'} h={'100%'}>
          <GalleryContainer />
        </Flex>
        <Flex w={'50%'} h={'100%'}></Flex>
      </Flex>
    </Box>
  )
}

export default EventDetails
