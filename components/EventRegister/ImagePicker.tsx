import { Box, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { FunctionComponent, useCallback, useRef, useState } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import ImageHolderConatiner from './ImageHolderConatiner'
import { FcAddImage } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { cloneDeep } from 'lodash'
import TitleTemplate from './TitleTemplate'
import { useErrorToast } from '../../shared/hooks/use-error-toast.hook'
import ImagePreviewPopup from './ImagePreviewPopup'

const ImagePicker: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [isDragging, setIsDragging] = useState(false)
  const colors = useColor()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const errorToast = useErrorToast()

  const onUploadImages = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) return
      if (
        event.target.files.length > 10 ||
        newEvent.eventImages.length >= 10 ||
        event.target.files.length + newEvent.eventImages.length > 10
      ) {
        errorToast('Upload limit', 'Only max of 10 images are allowed')
        return
      }
      const files: FileList = event.target.files
      for (let i = 0; i < files.length; i++) {
        if (
          !newEvent.eventImages?.some((image) => image.name === files[i].name)
        ) {
          setNewEvent((currentEvent) => {
            const clonedEvent = cloneDeep(currentEvent)
            const index = clonedEvent.eventImages.findIndex(
              (singleImage) => singleImage.image === files[i]
            )
            if (index <= 0) {
              clonedEvent.eventImages.push({
                name: URL.createObjectURL(files[i]),
                image: files[i],
              })
            }

            return clonedEvent
          })
        }
      }
    },
    [errorToast, newEvent.eventImages, setNewEvent]
  )

  return (
    <>
      <Box w={{ base: '95%', md: '90%' }} h={'100%'}>
        <TitleTemplate isRequired={false} title='Event gallery' />

        <Box
          m={'auto'}
          borderWidth={'thick'}
          borderColor={colors.textColor}
          borderRadius={'lg'}
          opacity={isDragging ? 0.4 : 1.0}
          pos={'relative'}
          bg={colors.mainBackground}
        >
          <Box w={'100%'} h={'100%'}>
            <Image
              src={'./images/dragAndDrop1.png'}
              alt=''
              w={'50%'}
              borderRadius={'5xl'}
              fit={'contain'}
              h={'70%'}
              m={'auto'}
              mt={'2%'}
            ></Image>
            <Text
              mt={2}
              fontWeight={'bold'}
              fontSize={{ base: 'xs', md: 'lg' }}
              textAlign={'center'}
              letterSpacing={'widest'}
            >
              Drag and drop image here
            </Text>

            <label
              htmlFor='image'
              onDragLeave={() => {
                setIsDragging(false)
              }}
              onDragOver={() => {
                setIsDragging(true)
              }}
              onDrop={() => {
                setIsDragging(false)
              }}
            >
              <Input
                type='file'
                h={'100%'}
                w={'100%'}
                pos={'absolute'}
                opacity={0}
                top={0}
                left={0}
                multiple
                accept='image/png, image/jpg, image/jpeg'
                ref={fileInputRef}
                onChange={(event) => onUploadImages(event)}
              />
            </label>
          </Box>
        </Box>
      </Box>

      <Flex
        mt={2}
        mb={6}
        w={{ base: '100%', md: '90%' }}
        borderRadius={0}
        h={'100%'}
        gap={4}
        flexWrap={'wrap'}
        ml={{ base: 2, md: 8 }}
      >
        {newEvent.eventImages?.map((image, index) => {
          return (
            <ImagePreviewPopup
              key={index}
              imageUrl={image.name}
              index={index}
            />
          )
        })}

        <Box
          w={{ base: '82px', sm: '130px' }}
          h={{ base: '82px', sm: '130px' }}
          borderWidth={2}
          mb={4}
          borderRadius={'lg'}
          cursor={'pointer'}
          borderColor={colors.textColor}
          _hover={{
            opacity: 0.5,
            boxShadow: '10px 10px 5px purple',
            top: -1,
            left: -1,
          }}
          onClick={() => {
            if (fileInputRef && fileInputRef.current) {
              fileInputRef.current.click()
            }
          }}
          top={0}
          textAlign={'center'}
          transition={'box-shadow ease 0.2s'}
          pos={'relative'}
        >
          <Box
            fontSize={{ base: '5xl', sm: '7xl' }}
            ml={{ base: '20%', sm: '20%' }}
            mt={{ base: '20%', sm: '20%' }}
          >
            <FcAddImage />
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ImagePicker
