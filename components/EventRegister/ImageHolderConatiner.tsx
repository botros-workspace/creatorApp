import { Box, Image } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import { RiDeleteBin5Line } from 'react-icons/ri'
import TooltipTemplate from '../shared/TooltipTemplate'
type Props = { image: string; onDelete: () => void }
const ImageHolderConatiner: FunctionComponent<Props> = ({
  image,
  onDelete,
}) => {
  const colors = useColor()

  return (
    <Box
      w={{ base: '82px', sm: '130px' }}
      h={{ base: '82px', sm: '130px' }}
      borderWidth={2}
      borderRadius={'lg'}
      top={0}
      borderColor={colors.textColor}
      textAlign={'center'}
      transition={'box-shadow ease 0.2s'}
      pos={'relative'}
      _hover={{
        boxShadow: '10px 10px 5px grey',
        top: -1,
        left: -1,
      }}
    >
      <TooltipTemplate
        label={'Delete'}
        hasArrow={true}
        placement={'bottom'}
        shouldWrapChildren={false}
      >
        <Box
          pos={'absolute'}
          cursor={'pointer'}
          right={1}
          top={1}
          fontSize={{ base: 'lg', md: 'xl' }}
          color='red'
          _hover={{
            opacity: 0.5,
            fontSize: '2xl',
          }}
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <RiDeleteBin5Line />
        </Box>
      </TooltipTemplate>
      <Image
        borderRadius={'md'}
        alt={image}
        src={image}
        w={{ base: '77px', sm: '126px' }}
        h={{ base: '77px', sm: '126px' }}
        objectFit={'contain'}
      ></Image>
    </Box>
  )
}

export default ImageHolderConatiner
