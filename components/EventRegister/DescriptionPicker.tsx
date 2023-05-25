import React, { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { useColor } from '../../shared/hooks/use-color.hook'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { Box, Textarea } from '@chakra-ui/react'
import TitleTemplate from './TitleTemplate'

const DescriptionPicker: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const colors = useColor()

  return (
    <Box w={'100%'} h={'100%'}>
      <Box w={'100%'} h={{ base: 52, md: '55%' }}>
        <TitleTemplate isRequired={true} title='Description' />
        <Textarea
          h={'90%'}
          mt={{ base: 0, md: 2 }}
          value={newEvent.description}
          outline={'none'}
          resize={'none'}
          fontWeight={'semibold'}
          color={colors.textOnHover}
          boxShadow={'none'}
          _focus={{
            boxShadow: 'none ',
            borderColor: colors.textColor,
          }}
          borderColor={colors.textColor}
          fontSize={{ base: 14, md: 24 }}
          borderWidth={2}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          placeholder='Enter a full description of the event...'
        />
      </Box>
      <Box w={'100%'} h={{ base: 44, md: '40%' }} mt={{ base: 7, md: 6 }}>
        <TitleTemplate isRequired={true} title='Teaser' />
        <Textarea
          h={'85%'}
          mt={{ base: 0, md: 2 }}
          value={newEvent.teaser}
          outline={'none'}
          resize={'none'}
          fontWeight={'semibold'}
          color={colors.textOnHover}
          boxShadow={'none'}
          borderColor={colors.textColor}
          fontSize={{ base: 14, md: 24 }}
          _focus={{
            boxShadow: 'none ',
            borderColor: colors.textColor,
          }}
          borderWidth={2}
          onChange={(e) => setNewEvent({ ...newEvent, teaser: e.target.value })}
          placeholder='Enter a teaser about the event...'
        />
      </Box>
    </Box>
  )
}

export default DescriptionPicker
