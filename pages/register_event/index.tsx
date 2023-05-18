import React, { useEffect } from 'react'
import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'
import StepsTemplate from '../../components/shared/StepsTemplate'
import LinksContainer from '../../components/EventRegister/LinksContainer'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { StepComponent } from '../../shared/interfaces/StepComponentAttribute'
import {
  ALL_EVENTS_PAGE,
  REGISTER_EVENT_LOCATION_PAGE,
} from '../../shared/constants/endpoints'
import MainInformation from '../../components/EventRegister/MainInformation'
import GeneralInformation from '../../components/EventRegister/GeneralInformation'
import EventDetails from '../../components/EventRegister/EventDetails'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'

const RegisterEvent: NextPage = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const router = useRouter()

  const businessRegisterSteps: StepComponent[] = [
    {
      label: 'Main Info',
      icon: HiOutlineExternalLink,
      component: <MainInformation />,
    },
    // {
    //   label: 'Details',
    //   icon: HiOutlineExternalLink,
    //   component: <EventDetails />,
    // },
    // {
    //   label: 'General Info',
    //   icon: HiOutlineExternalLink,
    //   component: <GeneralInformation />,
    // },
    {
      label: 'Contacts',
      icon: HiOutlineExternalLink,
      component: <LinksContainer />,
    },
  ]
  useEffect(() => {
    if (
      newEvent.selectedAddress === '' &&
      newEvent.lat === 0 &&
      newEvent.long === 0
    ) {
      router.push(REGISTER_EVENT_LOCATION_PAGE, undefined, { shallow: true })
    }
  })
  return (
    <Box w='100%' h='100%'>
      <Center>
        <StepsTemplate
          steps={businessRegisterSteps}
          color={'purple'}
          canResetSteps={true}
          resultComponent={undefined}
          onFinishClick={function (): void {
            throw new Error('Function not implemented.')
          }}
          onRegisterClick={function (): void {
            throw new Error('Function not implemented.')
          }}
          canRegister={false}
          redirectLink={ALL_EVENTS_PAGE}
        />
      </Center>
    </Box>
  )
}

export default RegisterEvent
