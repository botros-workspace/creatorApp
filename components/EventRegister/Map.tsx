import {
  Flex,
  Image,
  Box,
  IconButton,
  Center,
  Spinner,
  Text,
  Button,
} from '@chakra-ui/react'
import { TbCurrentLocation } from 'react-icons/tb'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import axios from 'axios'
import { MdMyLocation } from 'react-icons/md'
import { useColor } from '../../shared/hooks/use-color.hook'
import 'mapbox-gl/dist/mapbox-gl.css'
import { GoSearch } from 'react-icons/go'
import ReactMapGL, {
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
} from 'react-map-gl'
import { SearchBox } from '@mapbox/search-js-react'
import { MAPBOX_API_KEY } from '../../shared/constants/apiKeys'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import TitleTemplate from './TitleTemplate'

const MapContainer: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const mapRef = useRef<MapRef | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialLoading, setInintialLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState('')
  const [addressPlaceHolder, setAddressPlaceHolder] = useState('')
  const colors = useColor()
  const [showSelectedLocationMark, setShowSelectedLocationMark] =
    useState(false)
  const [marker, setMarker] = useState({
    latitude: newEvent.lat,
    longitude: newEvent.long,
  })
  const [userMarker, setUserMarker] = useState({
    latitude: 0,
    longitude: 0,
  })

  const changeView = useCallback((long: number, lat: number) => {
    mapRef.current?.flyTo({
      center: [long, lat],
      duration: 200,
      zoom: 15,
      speed: 1,
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }, [])

  const fetchAddress = useCallback(
    async (long: number, lat: number) => {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=address&access_token=${MAPBOX_API_KEY}`
      )
      if (
        res &&
        newEvent.selectedAddress?.toString() !==
          res.data.features[0]?.place_name.toString()
      ) {
        setNewEvent({
          ...newEvent,
          selectedAddress: res.data.features[0]?.place_name,
          long,
          lat,
        })
        changeView(long, lat)
      }
    },
    [changeView, newEvent, setNewEvent]
  )
  const onMarkerDrag = useCallback(
    (event: MarkerDragEvent) => {
      fetchAddress(event.lngLat.lng, event.lngLat.lat)
    },
    [fetchAddress]
  )
  const add_marker = useCallback(
    (event: MapLayerMouseEvent) => {
      var coordinates = event.lngLat
      fetchAddress(coordinates.lng, coordinates.lat)
    },
    [fetchAddress]
  )

  const setUserPosition = useCallback(
    (initialFetch: boolean) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserMarker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          if (initialFetch) {
            setTimeout(() => {
              setInintialLoading(false)
            }, 1000)
            setMarker({
              latitude: position.coords.latitude + 0.001,
              longitude: position.coords.longitude,
            })
          } else {
            setTimeout(() => {
              setInintialLoading(false)
            }, 600)
          }
          changeView(position.coords.longitude, position.coords.latitude)
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      )
    },
    [changeView]
  )

  const handleAddressRetrieve = useCallback(
    (res: any) => {
      setIsLoading(true)
      const feature = res.features[0]
      setMarker({
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      })
      fetchAddress(
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1]
      )
      changeView(
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1]
      )
    },
    [changeView, fetchAddress]
  )

  useEffect(() => {
    if (newEvent.selectedAddress !== '') {
      setIsLoading(true)
      setMarker({
        latitude: newEvent.lat,
        longitude: newEvent.long,
      })
      setShowSelectedLocationMark(true)
    }
  }, [
    changeView,
    newEvent.lat,
    newEvent.long,
    newEvent.selectedAddress,
    userMarker.latitude,
    userMarker.longitude,
  ])
  useEffect(() => {
    if (newEvent.selectedAddress === '') {
      setInintialLoading(true)
      setUserPosition(true)
    }
  }, [newEvent.selectedAddress, setUserPosition])
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [newEvent.long, newEvent.lat],
      duration: 500,
      zoom: 15,
      speed: 0.5,
    })
  }, [newEvent.lat, newEvent.long])
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [marker.longitude, marker.latitude],
      duration: 500,
      zoom: 15,
      speed: 0.5,
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [marker.latitude, marker.longitude])
  useEffect(() => {
    if (
      newEvent.selectedAddress === '' &&
      newEvent.lat === 0 &&
      newEvent.long === 0
    ) {
      setAddressPlaceHolder('Please choose a location...')
    } else if (
      newEvent.selectedAddress === undefined &&
      newEvent.lat !== 0 &&
      newEvent.long !== 0
    ) {
      setAddressPlaceHolder('Only location coordinates are available!')
    } else {
      setAddressPlaceHolder(newEvent.selectedAddress)
    }
  }, [newEvent.lat, newEvent.long, newEvent.selectedAddress])
  return (
    <Box w={'100%'} height={'90%'}>
      <Box position='relative' data-group>
        <Box h={'80%'} width={'100%'}>
          <Flex
            marginTop={2}
            ml={1}
            pos={'absolute'}
            top={0}
            left={1}
            zIndex={100}
          >
            <IconButton
              size={'sm'}
              textColor={colors.textColor}
              onClick={() => {
                setInintialLoading(true)
                setUserPosition(false)
              }}
              variant='outline'
              colorScheme='purple'
              aria-label='Send email'
              icon={<MdMyLocation />}
            />
          </Flex>
          <ReactMapGL
            reuseMaps={true}
            ref={mapRef}
            scrollZoom
            mapStyle='mapbox://styles/mapbox/streets-v11'
            style={{
              width: '100%',
              height: '450px',
            }}
            mapboxAccessToken={MAPBOX_API_KEY}
            onClick={(event) => add_marker(event)}
          >
            <Marker
              color='#6648BA'
              longitude={marker.longitude}
              latitude={marker.latitude}
              draggable
              onDrag={onMarkerDrag}
            ></Marker>

            <Marker
              longitude={userMarker.longitude}
              latitude={userMarker.latitude}
            >
              <Image src={'./images/userLocationIcon.png'} alt='Marker Icon' />
            </Marker>

            <NavigationControl />
          </ReactMapGL>
        </Box>
        {isLoading ||
          (initialLoading && (
            <Box
              position='absolute'
              opacity={0.6}
              bottom={0}
              top={0}
              background={'black'}
              left={0}
              right={0}
            >
              <Center h={'100%'} m={'auto'} color='white' fontSize={'3xl'}>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color={colors.textColor}
                  size='xl'
                />
              </Center>
            </Box>
          ))}
      </Box>

      <Box
        w={{ base: '70%', md: '80%' }}
        pos={'absolute'}
        left={0}
        right={0}
        marginLeft={'auto'}
        marginRight={'auto'}
        top={2}
      >
        <Box
          pos={'absolute'}
          right={3}
          top={{ base: 2, md: 1 }}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          <GoSearch color={colors.secondaryColor} />
        </Box>
        <SearchBox
          accessToken={MAPBOX_API_KEY}
          onRetrieve={handleAddressRetrieve}
          value={searchResult}
          onChange={(e) => {
            setSearchResult(e.toString())
          }}
          theme={{
            variables: {
              fontFamily: 'Avenir, sans-serif',
              fontWeight: '600',
              padding: '0.6em',
              borderRadius: '25px',
              colorText: colors.primaryColor,
            },
          }}
        />
      </Box>

      <Center w={'100%'} h={'20%'} p={4} pl={8}>
        <Flex flexDir={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 8 }}>
          <TitleTemplate isRequired={true} title={'Choosen address: '} />

          <Box
            h={'100%'}
            m={'auto'}
            w={{ base: 64, sm: 80, lg: 'lg' }}
            textAlign={'center'}
          >
            <Flex flexDir={'row'} w={'98%'}>
              <Text
                fontSize={{ base: 16, md: 24 }}
                color={colors.textOnHover}
                fontWeight={'semibold'}
                h={'100%'}
                m={'auto'}
                textAlign={'center'}
              >
                {addressPlaceHolder}
              </Text>
              {showSelectedLocationMark && (
                <Button
                  w={14}
                  h={12}
                  m={'auto'}
                  fontSize={'2xl'}
                  variant={'outline'}
                  borderColor={colors.secondaryColor}
                  color={colors.primaryColor}
                  onClick={() => {
                    changeView(newEvent.long, newEvent.lat)
                  }}
                >
                  <TbCurrentLocation />
                </Button>
              )}
            </Flex>
            <Box
              h={3}
              w={'100%'}
              borderBottomWidth={2}
              borderColor={colors.primaryColor}
            ></Box>
          </Box>
        </Flex>
      </Center>
    </Box>
  )
}

export default MapContainer
