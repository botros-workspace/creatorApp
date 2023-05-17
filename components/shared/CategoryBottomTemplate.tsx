import { Flex, Text, Box, Select, Center } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import { EventCategories } from '../../shared/enums/event-categories.enum'
import { capatalizedText } from '../../shared/functions/captalize-text'
import { IoCloseSharp } from 'react-icons/io5'

type Props = {
  category: EventCategories
  canDelete: boolean
  onDelete?: () => void
}
const CategoryBottomTemplate: FunctionComponent<Props> = ({
  category,
  canDelete,
  onDelete,
}) => {
  const colors = useColor()

  return (
    <Flex
      w={44}
      h={8}
      borderWidth={2}
      borderRadius={'full'}
      borderColor={colors.textOnHover}
      textAlign={'center'}
    >
      <Text
        w={'90%'}
        h={'100%'}
        m={'auto'}
        pl={3}
        pt={0.5}
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight={'semibold'}
      >
        {capatalizedText(category)}
      </Text>
      {canDelete && onDelete && (
        <Center
          h={'100%'}
          w={'30%'}
          m={'auto'}
          color={colors.secondaryColor}
          cursor={'pointer'}
          mr={1}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          <IoCloseSharp onClick={onDelete} />
        </Center>
      )}
    </Flex>
  )
}

export default CategoryBottomTemplate
