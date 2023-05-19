import { Flex, Text, Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import { FaStarOfLife } from 'react-icons/fa'
import TooltipTemplate from '../shared/TooltipTemplate'
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
        <TooltipTemplate
          label={'Required!'}
          hasArrow={false}
          placement={'auto'}
          shouldWrapChildren={false}
        >
          <Box
            ml={2}
            color={'red'}
            fontSize={{ base: 'xs', md: 'xl' }}
            cursor={'pointer'}
          >
            <FaStarOfLife />
          </Box>
        </TooltipTemplate>
      )}
    </Flex>
  )
}

export default TitleTemplate
