import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'
import StepsTemplate from '../../components/shared/StepsTemplate'
import LinksContainer from '../../components/EventRegister/LinksContainer'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { StepComponent } from '../../shared/interfaces/StepComponentAttribute'
import { ALL_EVENTS_PAGE } from '../../shared/constants/endpoints'
import MainInformation from '../../components/EventRegister/MainInformation'
import GeneralInformation from '../../components/EventRegister/GeneralInformation'
import EventDetails from '../../components/EventRegister/EventDetails'

const RegisterEvent: NextPage = () => {
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
