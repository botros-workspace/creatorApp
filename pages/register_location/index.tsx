import React, { useEffect, useState } from 'react'
import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'
import StepsTemplate from '../../components/shared/StepsTemplate'
import LinksContainer from '../../components/EventRegister/LinksContainer'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { StepComponent } from '../../shared/interfaces/StepComponentAttribute'
import { ALL_EVENTS_PAGE } from '../../shared/constants/endpoints'
import MainInformation from '../../components/EventRegister/MainInformation'
import GeneralInformation from '../../components/EventRegister/GeneralInformation'
import CategoriesSelectionContainer from '../../components/EventRegister/CategoriesSelectionContainer'
import { useRecoilValue } from 'recoil'
import { configurationsState } from '../../shared/recoilStates/configurations.state'
import LocationForm from '../../components/EventRegister/LocationForm'

const RegisterLocation: NextPage = () => {
  return (
    <Box w='100%' h='100%'>
      <LocationForm />
    </Box>
  )
}

export default RegisterLocation
