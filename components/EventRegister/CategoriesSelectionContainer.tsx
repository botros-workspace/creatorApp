import { Flex, Text, Box, Select, Center, SimpleGrid } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'
import TitleTemplate from './TitleTemplate'
import { EventCategories } from '../../shared/enums/event-categories.enum'
import { capatalizedText } from '../../shared/functions/captalize-text'
import CategoryBottomTemplate from '../shared/CategoryBottomTemplate'
import { EventAttributes } from '../../shared/interfaces/EventAttributes'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { cloneDeep } from 'lodash'

const CategoriesSelectionContainer: FunctionComponent = () => {
  const colors = useColor()
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const [selectedCategories, setSelectedCategories] = useState<
    EventCategories[]
  >(newEvent.other_categories)
  const [primaryCategory, setPrimaryCategory] = useState<EventCategories>(
    newEvent.primary_category
  )
  useEffect(() => {
    setSelectedCategories(newEvent.other_categories)
    setPrimaryCategory(newEvent.primary_category)
  }, [newEvent.other_categories, newEvent.primary_category])

  return (
    <Box w={'100%'} marginBottom={6}>
      <Flex w={'100%'} flexDir={'column'} gap={12}>
        <Flex
          w={{ base: '90%', lg: '70%' }}
          flexDir={'column'}
          m={'auto'}
          gap={2}
          borderBottomWidth={4}
          borderColor={colors.textColor}
        >
          <Flex>
            <TitleTemplate isRequired={true} title='Primary Category' />
          </Flex>
          <Select
            placeholder='Select primary category'
            border={0}
            value={primaryCategory}
            color={colors.textOnHover}
            fontSize={{ base: 'md', md: 'xl' }}
            fontWeight={'bold'}
            letterSpacing={'wider'}
            onChange={(e) => {
              console.log(e.target.value)

              setNewEvent((currentEvent) => {
                const clonedEvent = cloneDeep(currentEvent)
                const index = clonedEvent.other_categories.findIndex(
                  (singleCategory) => singleCategory === e.target.value
                )
                if (index > -1) {
                  clonedEvent.other_categories.splice(index, 1)
                }
                clonedEvent.primary_category = e.target.value as EventCategories
                return clonedEvent
              })
            }}
          >
            {Object.values(EventCategories).map((category, index) => {
              return (
                category !== EventCategories.UNDEFINED_CATEGORY && (
                  <option key={index} value={category}>
                    {capatalizedText(category)}
                  </option>
                )
              )
            })}
          </Select>
        </Flex>

        <Flex
          w={{ base: '90%', lg: '70%' }}
          flexDir={'column'}
          m={'auto'}
          gap={2}
          borderBottomWidth={4}
          borderColor={colors.textColor}
        >
          <Flex flexDir={'row'}>
            <TitleTemplate isRequired={false} title='Other Categories' />
          </Flex>
          <Select
            placeholder='Select category'
            border={0}
            color={colors.textOnHover}
            fontSize={{ base: 'md', md: 'xl' }}
            fontWeight={'bold'}
            letterSpacing={'wider'}
            onChange={(e) => {
              setNewEvent({
                ...newEvent,
                other_categories: [
                  ...newEvent.other_categories,
                  e.target.value as EventCategories,
                ],
              })
            }}
          >
            {Object.values(EventCategories).map((category, index) => {
              return (
                category !== EventCategories.UNDEFINED_CATEGORY &&
                !newEvent.other_categories.includes(category) &&
                category !== newEvent.primary_category && (
                  <option key={index} value={category}>
                    {capatalizedText(category)}
                  </option>
                )
              )
            })}
          </Select>
        </Flex>
        <SimpleGrid
          minChildWidth={{ base: '100px', sm: '120px' }}
          spacing={{ base: '12px', sm: '20px' }}
          w={{ base: '90%', lg: '70%' }}
          m={'auto'}
          borderBottomWidth={2}
          minH={44}
          borderColor={colors.textColor}
          borderRadius={0}
          justifyContent={'center'}
          p={3}
        >
          {selectedCategories.length === 0 ? (
            <Center>
              <Box
                w={44}
                h={8}
                borderWidth={2}
                borderRadius={'lg'}
                borderColor={colors.textOnHover}
                textAlign={'center'}
                textColor={'gray.500'}
              >
                None selected...
              </Box>
            </Center>
          ) : (
            selectedCategories.map((category) => {
              return (
                <Center key={category}>
                  <CategoryBottomTemplate
                    category={category}
                    canDelete={true}
                    onDelete={() => {
                      setNewEvent((currentEvent) => {
                        const clonedEvent = cloneDeep(currentEvent)
                        const index = clonedEvent.other_categories.findIndex(
                          (singleCategory) => singleCategory === category
                        )
                        if (index > -1) {
                          clonedEvent.other_categories.splice(index, 1)
                        }

                        return clonedEvent
                      })
                    }}
                  />
                </Center>
              )
            })
          )}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}

export default CategoriesSelectionContainer
