import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { mapInstance } from '../../shared/utils/mapInstance'
import { useRecoilState } from 'recoil'
import { newEventState } from '../../shared/recoilStates/new-event.state'
import { SearchBox } from '@mapbox/search-js-react'
import { MAPBOX_API_KEY } from '../../shared/constants/apiKeys'
import { useColor } from '../../shared/hooks/use-color.hook'

const MapContainer: FunctionComponent = () => {
  const [newEvent, setNewEvent] = useRecoilState(newEventState)
  const mapRef = useRef<HTMLDivElement>(null)
  const [searchResult, setSearchResult] = useState('')
  const colors = useColor()

  const handleAddressRetrieve = useCallback(
    (res: any) => {
      const feature = res.features[0]
      console.log(
        feature.properties.name + ', ' + feature.properties.place_formatted
      )

      setNewEvent({
        ...newEvent,
        long: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
        selectedAddress:
          feature.properties.name + ', ' + feature.properties.place_formatted,
      })

      // mapRef.current?.flyTo({
      //   center: [
      //     res.features[0].geometry.coordinates[0],
      //     res.features[0].geometry.coordinates[1],
      //   ],
      //   duration: 500,
      //   zoom: 15,
      //   speed: 0.5,
      // })
      console.log(feature)
    },
    [newEvent, setNewEvent]
  )
  useEffect(() => {
    if (mapRef.current) {
      mapInstance(mapRef.current, [-100.31019063199852, 25.66901932031443])
    }
  }, [])
  return (
    <>
      <SearchBox
        accessToken={MAPBOX_API_KEY}
        onRetrieve={handleAddressRetrieve}
        value={searchResult}
        onChange={(e) => setSearchResult(e.toString())}
        theme={{
          variables: {
            fontFamily: 'Avenir, sans-serif',
            fontWeight: '600',
            padding: '0.6em',
            minWidth: '100px',
            borderRadius: '25px',
            boxShadow: '0 0 0 2px silver',
            colorText: colors.secondaryColor,
          },
        }}
      />

      <div ref={mapRef} className='map' />
    </>
  )
}

export default MapContainer
