import { Text, Flex, Input, Box } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import TitleTemplate from './TitleTemplate'
import { getFinishTime } from '../../shared/functions/get-finish-time'
import { getEventDuration } from '../../shared/functions/get-event-duration'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import CategoriesSelectionContainer from './CategoriesSelectionContainer'

const MainInformationContainer: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [eventDuration, setEventDuration] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')
  const [eventStartTime, setEventStartTime] = useState('')
  const colors = useColor()

  useEffect(() => {
    setEventTitle(newEvent.title)
    setEventEndTime(newEvent.eventEndDateTime)
    setEventStartTime(newEvent.eventStartDateTime)
    if (newEvent.eventStartDateTime && newEvent.eventEndDateTime) {
      setEventDuration(
        getEventDuration(newEvent.eventStartDateTime, newEvent.eventEndDateTime)
      )
    } else {
      setEventDuration('')
    }
  }, [newEvent.eventEndDateTime, newEvent.eventStartDateTime, newEvent.title])
  return (
    <Flex w='100%' h='100%' flexDir={'column'}>
      <Flex
        h={'100%'}
        w={'100%'}
        m={'auto'}
        flexDir={{ base: 'column', md: 'row' }}
        gap={4}
        paddingBottom={12}
      >
        <Flex flexDir={'column'} w={{ base: '100%', lg: '50%' }} gap={12}>
          <Flex h={24}>
            <Box
              w={{ base: '90%', lg: '70%' }}
              m={'auto'}
              borderBottomWidth={4}
              borderBottomColor={colors.textColor}
            >
              <TitleTemplate isRequired={true} title='Title' />
              <Input
                w={'100%'}
                value={eventTitle}
                type='text'
                outline={'none'}
                fontWeight={'semibold'}
                color={colors.textOnHover}
                boxShadow={'none'}
                fontSize={{ base: 18, md: 24 }}
                h={12}
                border={0}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                _focus={{
                  boxShadow: 'none ',
                }}
                placeholder='Event name...'
                //   {...register('twitter')}
              />
            </Box>
          </Flex>
          <Flex h={24}>
            <Flex
              w={{ base: '90%', lg: '70%' }}
              m={'auto'}
              borderBottomWidth={4}
              borderBottomColor={colors.textColor}
              flexDir={'column'}
            >
              <Box marginBottom={'26px'}>
                <TitleTemplate isRequired={true} title='Starting time' />
              </Box>
              <input
                type='datetime-local'
                value={eventStartTime}
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    eventStartDateTime: e.target.value,
                    eventEndDateTime: getFinishTime(e.target.value),
                  })
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.textOnHover,
                  fontSize: '18px',
                  fontWeight: '650',
                  paddingBottom: '20px',
                  boxShadow: 'none !important',
                  border: '0 !important',
                  height: '20px',
                }}
              />
            </Flex>
          </Flex>
          <Flex h={24}>
            <Flex
              w={{ base: '90%', lg: '70%' }}
              m={'auto'}
              borderBottomWidth={4}
              borderBottomColor={colors.textColor}
              flexDir={'column'}
            >
              <Box marginBottom={'26px'}>
                <TitleTemplate isRequired={true} title='Finishing time' />
              </Box>
              <input
                type='datetime-local'
                value={eventEndTime}
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    eventEndDateTime: e.target.value,
                  })
                }}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.textOnHover,
                  fontSize: '18px',
                  fontWeight: '650',
                  paddingBottom: '20px',
                  boxShadow: 'none !important',
                  border: '0 !important',
                  height: '20px',
                }}
              />
            </Flex>
          </Flex>
          <Flex h={24}>
            <Flex
              w={{ base: '90%', lg: '70%' }}
              m={'auto'}
              borderBottomWidth={4}
              borderBottomColor={colors.textColor}
              flexDir={'row'}
              justifyContent={'space-between'}
            >
              <Box marginBottom={'26px'}>
                <TitleTemplate isRequired={false} title='Duration' />
              </Box>
              <Text
                color={colors.textOnHover}
                fontSize={{ base: 'md', md: '3xl' }}
                fontWeight={'bold'}
                mr={{ base: 1, md: 0 }}
                textDecor={'underline'}
              >
                {eventDuration}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} w={{ base: '100%', lg: '50%' }} gap={12}>
          <CategoriesSelectionContainer />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MainInformationContainer
