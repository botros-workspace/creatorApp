import { Flex, VisuallyHidden, Image, Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TitleTemplate from './TitleTemplate'
import { useColor } from '../../shared/hooks/use-color.hook'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'

const GalleryContainer: FunctionComponent = () => {
  const colors = useColor()
  const [newEvent, setNewEvent] = useRecoilState(newEventState)

  return (
    <Flex flexDir={'column'} gap={4}>
      <Flex w={{ base: '90%', lg: '70%' }} m={'auto'} mb={4}>
        <TitleTemplate title='Event image' />
      </Flex>
      <Flex>
        <Box
          position='relative'
          w={{ base: '90%', lg: '67%' }}
          h={'323px'}
          m={'auto'}
          borderWidth={1}
          borderColor={colors.primaryColor}
          data-group
          borderRadius={8}
        >
          <Image
            alt='event-image'
            objectFit='contain'
            w={'100%'}
            h={'325px'}
            pb={1}
            src={
              newEvent.eventImage
                ? URL.createObjectURL(newEvent.eventImage)
                : '/images/defaultEventImage.jpeg'
            }
            borderRadius={8}
          />

          <Box
            position='absolute'
            opacity={0.6}
            background={'black'}
            bottom={0}
            top={'80%'}
            left={0}
            right={0}
            borderBottomRadius={4}
          >
            <Box
              position='absolute'
              top='25%'
              m={'auto'}
              left={{ base: '46%', md: '47%' }}
              color='white'
              fontSize={'3xl'}
            >
              {newEvent.eventImage ? (
                <RiDeleteBin6Line
                  onClick={() =>
                    setNewEvent({
                      ...newEvent,
                      eventImage: undefined,
                    })
                  }
                  cursor='pointer'
                  color='red'
                />
              ) : (
                <label
                  htmlFor='image'
                  onChange={(e: any) => {
                    setNewEvent({
                      ...newEvent,
                      eventImage: e.target.files[0],
                    })
                  }}
                >
                  <VisuallyHidden>
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpg, image/jpeg'
                      // {...register('image')}
                    />
                  </VisuallyHidden>
                  <AiOutlineCloudUpload cursor='pointer' />
                </label>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default GalleryContainer
