import React from 'react'
import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import LocationForm from '../../components/EventRegister/LocationForm'

const RegisterLocation: NextPage = () => {
  return (
    <Box w='100%' h='100%'>
      <LocationForm />
    </Box>
  )
}

export default RegisterLocation
