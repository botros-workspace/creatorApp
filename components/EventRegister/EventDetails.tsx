import { Box, Flex, Textarea } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import GalleryContainer from './GalleryContainer'
import TitleTemplate from './TitleTemplate'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { useColor } from '../../shared/hooks/use-color.hook'

const EventDetails: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [eventTeaser, setEventTeaser] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const colors = useColor()

  useEffect(() => {
    setEventTeaser(newEvent.teaser)
    setEventDescription(newEvent.description)
  }, [newEvent.description, newEvent.teaser])
  return (
    <Box w={'100%'} h={'100%'} bg={'red'}>
      <Flex w={'100%'} h={'100%'}>
        <Flex w={{ base: '100%', lg: '50%' }} h={'100%'}>
          <GalleryContainer />
        </Flex>
        <Flex
          w={{ base: '100%', lg: '50%' }}
          h={'100%'}
          flexDir={'column'}
          bg={'beige'}
        >
          <Flex h={'60%'} w={'100%'} bg={'blue.400'}>
            <Box h={'100%'} w={'100%'}>
              <TitleTemplate isRequired={false} title='Description' />
              <Box w={'100%'} h={'100%'}>
                <Textarea
                  bg={'yellow.200'}
                  w={'2xl'}
                  m={'auto'}
                  value={eventDescription}
                  outline={'none'}
                  resize={'none'}
                  border={0}
                  fontWeight={'semibold'}
                  color={colors.textOnHover}
                  boxShadow={'none'}
                  borderColor={colors.textColor}
                  fontSize={{ base: 18, md: 24 }}
                  borderWidth={2}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  _focus={{
                    boxShadow: 'none ',
                  }}
                  placeholder='Enter a full description of the event...'
                />
              </Box>
            </Box>
          </Flex>
          <Flex h={'35%'}>
            <Box>
              <TitleTemplate isRequired={false} title='Teaser' />
              <Textarea
                w={'100%'}
                value={eventTeaser}
                outline={'none'}
                fontWeight={'semibold'}
                color={colors.textOnHover}
                boxShadow={'none'}
                borderColor={colors.textColor}
                fontSize={{ base: 18, md: 24 }}
                h={44}
                borderWidth={2}
                resize={'none'}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, teaser: e.target.value })
                }
                _focus={{
                  boxShadow: 'none ',
                }}
                placeholder='Enter a teaser about the event...'
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default EventDetails
