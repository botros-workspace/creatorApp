import {
  Text,
  Flex,
  Box,
  Input,
  Image,
  Checkbox,
  Center,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import TitleTemplate from './TitleTemplate'
import SliderTemplate from '../shared/SliderTemplate'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'

const GeneralInformation: FunctionComponent = () => {
  const colors = useColor()
  const [newEvent, setNewEvent] = useRecoilState(newEventState)

  return (
    <Flex
      w={'100%'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={{ base: 8, md: 0 }}
    >
      <Flex
        w={{ base: '100%', md: '50%' }}
        h={'100%'}
        flexDir={'column'}
        gap={8}
      >
        <Box
          h={24}
          pl={{ base: 0, md: 10 }}
          w={'100%'}
          m={{ base: 'auto', md: 0 }}
        >
          <TitleTemplate title={'Average prices'} isRequired={false} />
          <Flex
            flexDir={'column'}
            gap={5}
            pos={'relative'}
            w={{ base: '90%', sm: '60%' }}
            m={'auto'}
            mt={4}
          >
            <Box>
              <Text pos={'absolute'} left={0}>
                {newEvent.averagePrices[0]}
                {newEvent.attendeLimit < 10 && '%'}
              </Text>
              <Text pos={'absolute'} right={0}>
                {newEvent.averagePrices[1]}
              </Text>
            </Box>
            <Box>
              <SliderTemplate
                values={newEvent.averagePrices}
                onChange={(val) => {
                  setNewEvent({
                    ...newEvent,
                    averagePrices: val,
                  })
                }}
              />
            </Box>
          </Flex>
        </Box>
        <Box
          h={24}
          pl={{ base: 0, md: 10 }}
          w={'100%'}
          m={{ base: 'auto', md: 0 }}
        >
          <TitleTemplate title={'Age'} isRequired={false} />
          <Flex
            flexDir={'column'}
            gap={5}
            pos={'relative'}
            w={{ base: '90%', sm: '60%' }}
            m={'auto'}
            mt={4}
          >
            <Box>
              <Text pos={'absolute'} left={0}>
                {newEvent.avergaeAge[0]}
              </Text>
              <Text pos={'absolute'} right={0}>
                {newEvent.avergaeAge[1]}
              </Text>
            </Box>
            <Box>
              <SliderTemplate
                values={newEvent.avergaeAge}
                onChange={(val) => {
                  console.log('val', val)

                  setNewEvent({
                    ...newEvent,
                    avergaeAge: val,
                  })
                }}
              />
            </Box>
          </Flex>
        </Box>
        <Box
          h={24}
          pl={{ base: 0, md: 10 }}
          w={'100%'}
          m={{ base: 'auto', md: 0 }}
        >
          <TitleTemplate title={'Passive'} isRequired={false} />
          <Flex
            flexDir={'column'}
            gap={5}
            pos={'relative'}
            w={{ base: '90%', sm: '60%' }}
            m={'auto'}
            mt={4}
          >
            <Box>
              <Text pos={'absolute'} left={0}>
                {newEvent.averagePassive[0]}
              </Text>
              <Text pos={'absolute'} right={0}>
                {newEvent.averagePassive[1]}
              </Text>
            </Box>
            <Box>
              <SliderTemplate
                values={newEvent.averagePassive}
                onChange={(val) => {
                  console.log('val', val)

                  setNewEvent({
                    ...newEvent,
                    averagePassive: val,
                  })
                }}
              />
            </Box>
          </Flex>
        </Box>
        <Box
          h={24}
          pl={{ base: 0, md: 10 }}
          w={'100%'}
          m={{ base: 'auto', md: 0 }}
        >
          <TitleTemplate title={'Contemplative'} isRequired={false} />
          <Flex
            flexDir={'column'}
            gap={5}
            pos={'relative'}
            w={{ base: '90%', sm: '60%' }}
            m={'auto'}
            mt={4}
          >
            <Box>
              <Text pos={'absolute'} left={0}>
                {newEvent.averageContemplative[0]}
              </Text>
              <Text pos={'absolute'} right={0}>
                {newEvent.averageContemplative[1]}
              </Text>
            </Box>
            <Box>
              <SliderTemplate
                values={newEvent.averageContemplative}
                onChange={(val) => {
                  console.log('val', val)

                  setNewEvent({
                    ...newEvent,
                    averageContemplative: val,
                  })
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex
        w={{ base: '100%', md: '50%' }}
        h={'100%'}
        flexDir={'column'}
        gap={16}
      >
        <Flex
          w={{ base: '100%', md: '70%' }}
          m={'auto'}
          borderBottomWidth={4}
          borderBottomColor={colors.textColor}
          justifyContent={'space-between'}
        >
          <Box
            w={{ base: '50%', md: '60%', lg: '70%' }}
            pl={{ base: 0, md: 4 }}
            m={'auto'}
          >
            <TitleTemplate isRequired={false} title='Attende limit' />
          </Box>
          <Input
            w={{ base: '50%', md: '40%', lg: '30%' }}
            textAlign={'center'}
            mb={1}
            borderWidth={0}
            value={newEvent.attendeLimit}
            type='number'
            borderRadius={0}
            fontWeight={'semibold'}
            color={colors.textOnHover}
            boxShadow={'none'}
            fontSize={{
              base: newEvent.attendeLimit !== 0 ? 14 : 28,
              lg: newEvent.attendeLimit !== 0 ? 28 : 28,
            }}
            h={12}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                attendeLimit: parseInt(e.target.value),
              })
            }
            _focus={{
              boxShadow: 'none ',
            }}
            placeholder='Amount...'
          />
        </Flex>
        <Box w={{ base: '100%', md: '70%' }} m={'auto'}>
          <Flex flexDir={'column'} gap={8}>
            <Flex w={'100%'}>
              <TitleTemplate isRequired={false} title='Event takes place...' />
            </Flex>
            <Flex w={'100%'}>
              <Flex w={'50%'} flexDir={'column'}>
                <Image
                  src={'./images/indoor.png'}
                  alt=''
                  w={{ base: '50%', md: '40%' }}
                  fit={'contain'}
                  h={'70%'}
                  m={'auto'}
                  mt={'2%'}
                ></Image>

                <Checkbox
                  isChecked={newEvent.isIndoor}
                  borderColor={colors.primaryColor}
                  textColor={colors.textOnHover}
                  fontSize={18}
                  m={'auto'}
                  fontWeight={'semibold'}
                  onChange={() => {
                    setNewEvent({ ...newEvent, isIndoor: !newEvent.isIndoor })
                  }}
                >
                  <Text
                    textColor={colors.textOnHover}
                    fontSize={18}
                    fontWeight={'semibold'}
                  >
                    Indoors
                  </Text>
                </Checkbox>
              </Flex>
              <Flex w={'50%'} flexDir={'column'}>
                <Image
                  src={'./images/outdoor.png'}
                  alt=''
                  w={{ base: '50%', md: '40%' }}
                  fit={'contain'}
                  h={'70%'}
                  m={'auto'}
                  borderWidth={2}
                  mt={'2%'}
                ></Image>

                <Checkbox
                  isChecked={newEvent.isOutdoor}
                  borderColor={colors.primaryColor}
                  m={'auto'}
                  onChange={() => {
                    if (newEvent.isOutdoor) {
                      setNewEvent({
                        ...newEvent,
                        isOutdoor: false,
                        isPreparedForRain: false,
                      })
                    } else {
                      setNewEvent({
                        ...newEvent,
                        isOutdoor: true,
                      })
                    }
                  }}
                >
                  <Text
                    textColor={colors.textOnHover}
                    fontSize={18}
                    fontWeight={'semibold'}
                  >
                    Outdoors
                  </Text>
                </Checkbox>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        {newEvent.isOutdoor && (
          <Box
            w={{ base: '100%', md: '70%' }}
            m={'auto'}
            h={32}
            pos={'relative'}
          >
            <TitleTemplate
              title={'Is the place equipped in case of rainy weather?'}
              isRequired={false}
            />

            <Center pos={'absolute'} bottom={0} w={'100%'}>
              <Checkbox
                isChecked={newEvent.isPreparedForRain}
                borderColor={colors.primaryColor}
                textColor={colors.textOnHover}
                fontWeight={'bold'}
                onChange={() => {
                  setNewEvent({
                    ...newEvent,
                    isPreparedForRain: !newEvent.isPreparedForRain,
                  })
                }}
              >
                <Text
                  textColor={colors.textOnHover}
                  fontSize={28}
                  fontWeight={'semibold'}
                >
                  Yes
                </Text>
              </Checkbox>
            </Center>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default GeneralInformation
