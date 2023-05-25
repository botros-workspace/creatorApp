import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  useDisclosure,
  Box,
  ModalCloseButton,
} from '@chakra-ui/react'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import ImageHolderConatiner from './ImageHolderConatiner'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { HiChevronDoubleLeft } from 'react-icons/hi'
interface Props {
  imageUrl: string
  index: number
}
const ImagePreviewPopup: FunctionComponent<Props> = ({ imageUrl, index }) => {
  const colors = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [imageToRender, setImageToRender] = useState(imageUrl)
  const [indexToREndered, setIndexToREndered] = useState(index)

  const goToNextImage = useCallback(() => {
    if (indexToREndered + 1 >= newEvent.eventImages.length) {
      setImageToRender(newEvent.eventImages[0].name)
      setIndexToREndered(0)
    } else {
      setImageToRender(newEvent.eventImages[indexToREndered + 1].name)
      setIndexToREndered(indexToREndered + 1)
    }
  }, [indexToREndered, newEvent.eventImages])

  const goToPreviousImage = useCallback(() => {
    if (indexToREndered - 1 === -1) {
      setImageToRender(
        newEvent.eventImages[newEvent.eventImages.length - 1].name
      )
      setIndexToREndered(newEvent.eventImages.length - 1)
    } else {
      setImageToRender(newEvent.eventImages[indexToREndered - 1].name)
      setIndexToREndered(indexToREndered - 1)
    }
  }, [indexToREndered, newEvent.eventImages])

  useEffect(() => {
    const handleKeyClick = (event: any) => {
      if (event.keyCode === 37) {
        goToPreviousImage()
      }
      if (event.keyCode === 39) {
        goToNextImage()
      }
    }
    window.addEventListener('keydown', handleKeyClick)

    return () => {
      window.removeEventListener('keydown', handleKeyClick)
    }
  }, [goToNextImage, goToPreviousImage])

  return (
    <>
      <Box
        onClick={() => {
          setIndexToREndered(index)
          setImageToRender(newEvent.eventImages[index].name)
          onOpen()
        }}
        cursor={'pointer'}
      >
        <ImageHolderConatiner
          image={imageUrl}
          onDelete={() => {
            const filteredImages = newEvent.eventImages.filter(
              (_, i) => i !== index
            )
            setNewEvent({ ...newEvent, eventImages: filteredImages })
          }}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          w={{ base: '70%', md: '60%' }}
          h={{ base: '70%', md: '80%' }}
        >
          <Box
            pos={'absolute'}
            top={'50%'}
            right={0}
            w={'0%'}
            onClick={goToNextImage}
            cursor={'pointer'}
          >
            <Box
              float={'left'}
              bg={colors.mainBackground}
              rounded={'full'}
              ml={1.5}
              p={2}
              fontSize={{ base: 'sm', sm: '3xl' }}
              transform={'rotateY(180deg)'}
              _hover={{
                bg: colors.textColor,
                opacity: '0.7',
                color: 'white',
                fontSize: { base: 'sm', sm: '5xl' },
                mt: { base: 0, sm: -2 },
              }}
            >
              <HiChevronDoubleLeft />
            </Box>
          </Box>
          <Box
            pos={'absolute'}
            top={'50%'}
            w={'0%'}
            onClick={goToPreviousImage}
            cursor={'pointer'}
          >
            <Box
              mr={1.5}
              float={'right'}
              bg={colors.mainBackground}
              rounded={'full'}
              p={2}
              fontSize={{ base: 'sm', sm: '3xl' }}
              _hover={{
                bg: colors.textColor,
                opacity: '0.7',
                color: 'white',
                fontSize: { base: 'sm', sm: '5xl' },
                mt: { base: 0, sm: -2 },
              }}
            >
              <HiChevronDoubleLeft />
            </Box>
          </Box>
          <ModalBody
            w={{ base: '200px', md: '240px' }}
            h={{ base: '520px', md: '650px' }}
            m={'auto'}
          >
            <ModalCloseButton
              cursor={'pointer'}
              onClick={onClose}
              rounded={'full'}
              pos={'absolute'}
              color='red'
              bg={'red.100'}
              _hover={{
                color: 'white',
                bg: 'red',
              }}
            />

            <Image
              borderRadius={'md'}
              borderWidth={4}
              borderColor={colors.textColor}
              alt={imageToRender}
              src={imageToRender}
              w={{ base: '200px', md: '240px' }}
              h={'90%'}
              objectFit={'contain'}
              m={'auto'}
              mt={'10%'}
            ></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImagePreviewPopup
