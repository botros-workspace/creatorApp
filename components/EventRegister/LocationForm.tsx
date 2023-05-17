import { Center, Flex, Button, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import BurgerMenuContainer from '../NavBar/BurgerMenuContainer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { configurationsState } from '../../shared/recoilStates/configurations.state'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { useRouter } from 'next/router'
import { REGISTER_EVENT_PAGE } from '../../shared/constants/endpoints'

const LocationForm: FunctionComponent = () => {
  const colors = useColor()
  const router = useRouter()
  const [config, setConfig] = useRecoilState(configurationsState)
  const newEvent = useRecoilValue(newEventState)
  const [canRegister, setCanRegister] = useState(false)
  const Map = dynamic(
    () => {
      return import('../../components/EventRegister/Map')
    },
    { ssr: false }
  )
  useEffect(() => {
    setCanRegister(newEvent.selectedAddress === '')
  }, [newEvent.selectedAddress])
  return (
    <Box w={'100%'} height={'100vh'}>
      <Map />
      <Center>
        <Flex flexDir={'row'} gap={{ base: 2, md: 16 }} h={'10%'}>
          <Button
            w={{ base: 28, md: 32 }}
            p={6}
            letterSpacing={'widest'}
            fontWeight={'bold'}
            bg={colors.secondaryColor}
            textColor={'white'}
            borderRadius={'full'}
          >
            Back
          </Button>
          <Box position={'absolute'} h={12}>
            <BurgerMenuContainer />
          </Box>
          <Button
            isDisabled={canRegister}
            w={{ base: 28, md: 32 }}
            p={6}
            borderRadius={'lg'}
            _hover={{
              bg: colors.textOnHover,
            }}
            fontWeight={'bold'}
            bg={colors.primaryColor}
            textColor={'white'}
            onClick={() => {
              setConfig({ ...config, newEventLocationProvided: true })
              router.push(REGISTER_EVENT_PAGE, undefined, { shallow: true })
            }}
          >
            Register
          </Button>
        </Flex>
      </Center>
    </Box>
  )
}

export default LocationForm
