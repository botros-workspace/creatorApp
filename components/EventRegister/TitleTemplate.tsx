import { Flex, Text, Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import { FaStarOfLife } from 'react-icons/fa'
type Props = {
  title: string
  isRequired: boolean
}
const TitleTemplate: FunctionComponent<Props> = ({ title, isRequired }) => {
  const colors = useColor()

  return (
    <Flex flexDir={'row'}>
      <Text
        color={colors.textColor}
        fontSize={{ base: 16, md: 24 }}
        fontWeight={'bold'}
        float={'left'}
        letterSpacing={'wider'}
        h={8}
      >
        {title}
      </Text>
      {isRequired && (
        <Box ml={2} color={'red'}>
          <FaStarOfLife />
        </Box>
      )}
    </Flex>
  )
}

export default TitleTemplate
