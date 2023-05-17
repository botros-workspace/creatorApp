import { Box, Flex, Spacer } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import BurgerMenuContainer from './BurgerMenuContainer'
import { useColor } from '../../shared/hooks/use-color.hook'
const NavBar: FunctionComponent = () => {
  const colors = useColor()
  return (
    <>
      <Flex flexDir='row' justifyContent='space-between'>
        <Flex></Flex>

        <Flex pr={3} pt={1}>
          <BurgerMenuContainer />
        </Flex>
      </Flex>
      <Box w={'100%'} h={0.5} bg={colors.primaryColor}></Box>
    </>
  )
}

export default NavBar
