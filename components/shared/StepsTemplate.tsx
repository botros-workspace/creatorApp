import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { StepComponent } from '../../shared/interfaces/StepComponentAttribute'
import { useRecoilState } from 'recoil'
import { configurationsState } from '../../shared/recoilStates/configurations.state'
import { REGISTER_EVENT_LOCATION_PAGE } from '../../shared/constants/endpoints'
import { useRouter } from 'next/router'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import axios from 'axios'
import { uuid } from 'uuidv4'
import { EventCategories } from '../../shared/enums/event-categories.enum'
import { useColor } from '../../shared/hooks/use-color.hook'

type Props = {
  steps: StepComponent[]
  color: string
  canResetSteps: boolean
  redirectLink?: string
  resultComponent: ReactNode
  onFinishClick: () => void
  onRegisterClick: () => void
  canRegister: boolean
}
const StepsTemplate: FunctionComponent<Props> = ({
  steps,
  color,
  canResetSteps = false,
  redirectLink,
  resultComponent,
  onFinishClick,
  onRegisterClick,
  canRegister,
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const [config, setConfig] = useRecoilState(configurationsState)
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [showResgisterBottom, setShowResgisterBottom] = useState(false)
  const router = useRouter()
  const colors = useColor()
  const submitHandler = async () => {
    let convertedCategories: string[] = []
    if (newEvent.other_categories.length === 0) {
      convertedCategories.push(newEvent.primary_category)
    } else {
      convertedCategories = newEvent.other_categories.toString().split(',')
      convertedCategories.push(newEvent.primary_category)
    }

    const values: {
      title: string
      teaser: string
      description: string
      ident: string
      categories: string[]
      attendee_limit: number
      ticket_cost: number
      contacts: { type: string; role: string; value: string; text: string }[]
      location: {
        ident: string
        lat: number
        lon: number
        name: string
        role: string
      }
      is_qualified_data: boolean
      primary_image: { url: string; alt: string; role: string }
      begin: string
      until: string
      weather_dependent: string
    } = {
      title: newEvent.title,
      teaser: newEvent.teaser,
      categories: convertedCategories,
      location: {
        ident: uuid(),
        lat: newEvent.lat,
        lon: newEvent.long,
        name: newEvent.selectedAddress,
        role: 'primary',
      },
      is_qualified_data: true,
      begin: new Date(newEvent.eventStartDateTime).toISOString(),
      until: new Date(newEvent.eventEndDateTime).toISOString(),
      description: newEvent.description,
      ident: uuid(),
      attendee_limit: 20,
      ticket_cost: 20,
      contacts: [
        {
          type: 'tel',
          role: 'primary',
          value:
            newEvent.phone_number === ''
              ? '+43 699 99999998'
              : newEvent.phone_number,
          text: '',
        },
        {
          type: 'email',
          role: 'primary',
          value:
            newEvent.website === ''
              ? 'demo-event@balloon-events.com'
              : newEvent.website,
          text: '',
        },
      ],

      primary_image: {
        url: 'https://i.imgur.com/ix67cxp.jpeg',
        alt: 'primary_image',
        role: 'primary',
      },
      weather_dependent: newEvent.weather_dependent === '' ? 'both' : 'outdoor',
    }

    try {
      const response = await axios.post(
        'https://api.balloon-events.com/creator/events',
        values
      )
      console.log(values, 'Values on POST')
      console.log('Response data: ', response.data)
      console.log('Response: ', response)
      const id = response.data.ident
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (
      newEvent.eventStartDateTime !== '' &&
      newEvent.title !== '' &&
      newEvent.lat !== 0 &&
      newEvent.long !== 0 &&
      newEvent.primary_category !== EventCategories.UNDEFINED_CATEGORY &&
      newEvent.primary_category.toString() !== '' &&
      newEvent.selectedAddress !== ''
    ) {
      setShowResgisterBottom(true)
    } else {
      setShowResgisterBottom(false)
    }
  }, [
    newEvent.eventStartDateTime,
    newEvent.lat,
    newEvent.long,
    newEvent.primary_category,
    newEvent.selectedAddress,
    newEvent.title,
  ])
  return (
    <Flex
      flexDir='column'
      alignSelf='center'
      w='95%'
      h={{ base: 'auto', md: '95vh' }}
    >
      <Steps
        activeStep={activeStep}
        colorScheme={color}
        maxW='100%'
        alignSelf='center'
        fontSize={{ base: 'sm', md: 'md' }}
      >
        {steps.map(({ label, icon, component }) => (
          <Step label={label} key={label} icon={icon}>
            <Box h={{ base: 'auto', md: '70vh' }} w='100%' overflowY='scroll'>
              {component}
            </Box>
          </Step>
        ))}
      </Steps>

      {activeStep === steps.length ? (
        <Flex
          px={4}
          py={4}
          flexDirection='column'
          h={{ base: 'auto', md: '81vh' }}
        >
          <Box h={{ base: 'auto', md: '70vh' }}>{resultComponent}</Box>
          <Flex alignSelf='center' mt={4} gap={4}>
            {canResetSteps && (
              <Button mx='auto' size='sm' onClick={reset} variant='ghost'>
                Edit
              </Button>
            )}
            {!redirectLink && (
              <Button
                size='sm'
                onClick={onRegisterClick}
                mr={4}
                disabled={!canRegister}
              >
                Register
              </Button>
            )}
          </Flex>
        </Flex>
      ) : (
        <Flex alignSelf='center' m={8} gap={4}>
          <Button
            onClick={() => {
              if (activeStep === 0) {
                setConfig({ ...config, newEventLocationProvided: false })
                router.push(REGISTER_EVENT_LOCATION_PAGE, undefined, {
                  shallow: true,
                })
              } else {
                prevStep()
              }
            }}
            size='sm'
            variant='ghost'
          >
            Prev
          </Button>
          <Button
            size='sm'
            onClick={() =>
              activeStep === steps.length - 1
                ? (onFinishClick(), nextStep())
                : nextStep()
            }
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
          <Button
            background={colors.primaryColor}
            size='sm'
            isDisabled={!showResgisterBottom}
            onClick={submitHandler}
            textColor={'white'}
          >
            Register
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
export default StepsTemplate
