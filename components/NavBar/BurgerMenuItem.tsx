import { Button, Icon, Text, Grid, GridItem } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { IconType } from 'react-icons/lib'
import { useColor } from '../../shared/hooks/use-color.hook'

type Props = {
  route: string | undefined
  icon: IconType
  text: string
  changeRoute: () => void
  handleOnClick: () => void
  iconColor?: string
  isActive: boolean
}

const BurgerMenuItem: FunctionComponent<Props> = ({
  route,
  icon,
  handleOnClick,
  changeRoute,
  text,
  iconColor,
  isActive,
}) => {
  const { textColor, textOnHover, primaryColor } = useColor()

  return (
    <Button
      bg='none'
      _hover={{ color: textColor }}
      _focus={{ background: 'none' }}
      _active={{ background: 'none' }}
      color={isActive ? textColor : textOnHover}
      variant='outline'
      borderColor={primaryColor}
      size={{ base: 'sm', md: 'lg' }}
      onClick={() => {
        if (changeRoute) {
          changeRoute()
        }
        if (handleOnClick) {
          handleOnClick()
        }
      }}
    >
      <Grid
        fontSize={{ base: 'xs', md: 'md' }}
        w={{ base: 32, md: 44 }}
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(8, 1fr)'
      >
        <GridItem colSpan={1}>
          <Icon
            as={icon}
            color={iconColor}
            fontSize={{ base: 'sm', md: '2xl' }}
          />
        </GridItem>

        <GridItem colSpan={7} textAlign='center'>
          <Text mt={{ base: 0, md: 1 }} fontWeight='bold'>
            {text}
          </Text>
        </GridItem>
      </Grid>
    </Button>
  )
}
export default BurgerMenuItem
