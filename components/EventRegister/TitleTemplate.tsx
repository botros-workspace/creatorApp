import { Flex, Text, Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
type Props = {
  title: string
}
const TitleTemplate: FunctionComponent<Props> = ({ title }) => {
  const colors = useColor()

  return (
    <>
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
    </>
  )
}

export default TitleTemplate
