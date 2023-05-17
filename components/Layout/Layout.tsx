import React, { FunctionComponent, ReactNode } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import NavBar from '../NavBar'
import { useColor } from '../../shared/hooks/use-color.hook'
import { useRecoilValue } from 'recoil'
import { configurationsState } from '../../shared/recoilStates/configurations.state'
import { useRouter } from 'next/router'
import { REGISTER_EVENT_LOCATION_PAGE } from '../../shared/constants/endpoints'

interface Props {
  children: ReactNode
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  const colors = useColor()
  const config = useRecoilValue(configurationsState)
  const router = useRouter()
  return (
    <Box bg={colors.mainBackground} w={'100%'} h={'100%'}>
      {router.pathname === REGISTER_EVENT_LOCATION_PAGE &&
      !config.newEventLocationProvided ? (
        <Box w='100%' h={0} />
      ) : (
        <Box w='100%' h={12} position='static' top={0}>
          <NavBar />
        </Box>
      )}
      <Box minH={'93vh'}>{children}</Box>
    </Box>
  )
}

export default Layout
