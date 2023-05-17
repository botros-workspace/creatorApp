import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Center,
  VStack,
  Icon,
  useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { SiOpenstreetmap } from 'react-icons/si'
import { useRouter } from 'next/router'
import { useColor } from '../../shared/hooks/use-color.hook'
import BurgerMenuItem from './BurgerMenuItem'
import { BurgerMenuItemComponent } from '../../shared/interfaces/BurgerMenuItemComponent'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { MdOutlineEventNote } from 'react-icons/md'
import { GiArchiveRegister } from 'react-icons/gi'
import {
  ALL_EVENTS_PAGE,
  LOGIN_PAGE,
  LOGOUT_PAGE,
  REGISTER_EVENT_LOCATION_PAGE,
  REGISTER_EVENT_PAGE,
} from '../../shared/constants/endpoints'
import { MdDarkMode } from 'react-icons/md'
import { BsLightbulb } from 'react-icons/bs'
import { configurationsState } from '../../shared/recoilStates/configurations.state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'

const BurgerMenu: FunctionComponent = () => {
  const { primaryColor, secondaryColor, menuBackgroundColor } = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const [config, setConfig] = useRecoilState(configurationsState)
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [shouldBottomViewChange, setShouldBottomViewChange] = useState(false)
  const changeRoute = useCallback(
    (route: string) => {
      router.push(`${route}`, undefined, { shallow: true })
      onClose()
    },
    [onClose, router]
  )

  const menuItems: BurgerMenuItemComponent[] = [
    {
      route: ALL_EVENTS_PAGE,
      icon: MdOutlineEventNote,
      text: 'All Events',
      show: true,
      changeRoute,
      isActive: router.pathname === ALL_EVENTS_PAGE,
    },
    {
      route: REGISTER_EVENT_LOCATION_PAGE,
      icon: GiArchiveRegister,
      text: 'Register Event',
      show: true,
      changeRoute,
      handleOnClick: () => {
        setConfig({ ...config, newEventLocationProvided: false })
        setNewEvent({ ...newEvent, selectedAddress: '', lat: 0, long: 0 })
      },
      isActive:
        router.pathname === REGISTER_EVENT_PAGE ||
        router.pathname === REGISTER_EVENT_LOCATION_PAGE,
    },
    {
      route: LOGIN_PAGE,
      icon: BiLogIn,
      text: 'Login',
      show: true,
      changeRoute,
      isActive: router.pathname === LOGIN_PAGE,
    },
    {
      route: LOGOUT_PAGE,
      icon: BiLogOut,
      text: 'Logout',
      show: false,
      changeRoute,
      isActive: router.pathname === LOGOUT_PAGE,
    },
    {
      icon: colorMode === 'light' ? MdDarkMode : BsLightbulb,
      text: colorMode === 'light' ? 'Dark Mode' : 'Light Mode',
      show: true,
      handleOnClick: () => {
        toggleColorMode()
        onClose()
      },
      isActive: false,
    },
  ]
  useEffect(() => {
    setShouldBottomViewChange(
      !config.newEventLocationProvided &&
        router.pathname === REGISTER_EVENT_LOCATION_PAGE
    )
  }, [config.newEventLocationProvided, router.pathname])
  return (
    <>
      <Icon
        _hover={{ color: secondaryColor }}
        _focus={{ background: 'none' }}
        _active={{ background: 'none' }}
        background='none'
        w={{
          base: shouldBottomViewChange ? 28 : 8,
          md: shouldBottomViewChange ? 32 : 8,
        }}
        h={shouldBottomViewChange ? 12 : 8}
        fontSize={['2xl', '2xl', '3xl']}
        onClick={onOpen}
        color={primaryColor}
        cursor='pointer'
      >
        {shouldBottomViewChange ? <></> : <HamburgerIcon />}
      </Icon>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={menuBackgroundColor}>
          <Icon
            _focus={{ background: 'none' }}
            _active={{ background: 'none' }}
            background='none'
            color={secondaryColor}
            right={3}
            top={1}
            fontSize={['2xl', '2xl', '3xl']}
            pos='fixed'
            cursor='pointer'
          >
            <HamburgerIcon />
          </Icon>
        </ModalOverlay>
        <ModalContent bg='none' boxShadow='none' mt={['50%', '20%', '15%']}>
          <ModalBody m='auto'>
            <Center>
              <VStack>
                {menuItems.map((item: BurgerMenuItemComponent) => (
                  <>
                    {item.show && (
                      <BurgerMenuItem
                        route={item.route}
                        icon={item.icon}
                        text={item.text}
                        handleOnClick={() => {
                          if (item.handleOnClick) {
                            item.handleOnClick()
                          }
                        }}
                        changeRoute={() => {
                          if (item.changeRoute && item.route) {
                            item.changeRoute(item.route)
                          }
                        }}
                        iconColor={item.iconColor}
                        isActive={item.isActive}
                      />
                    )}
                  </>
                ))}
              </VStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BurgerMenu
