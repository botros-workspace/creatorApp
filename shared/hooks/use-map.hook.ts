import { Map } from 'mapbox-gl'
import { MAPBOX_API_KEY } from '../constants/apiKeys'
import { useCallback, useRef } from 'react'

export type MapProps = {
  container: any
  viewport: {
    longitude: number
    latitude: number
    zoom: number
  }
}

export function useMapbox() {
  const mapInitRef = useRef<Map | null>(null)
  const mapInstance = useCallback(({ container, viewport }: MapProps) => {
    return new Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      pitchWithRotate: false,
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      accessToken: MAPBOX_API_KEY,
      doubleClickZoom: false,
    })
  }, [])
  return {
    mapReference: useCallback(
      ({ container, viewport }: MapProps) => {
        mapInitRef.current = mapInstance({ container, viewport })
        return mapInitRef
      },
      [mapInstance]
    ),
  }
}

// import { useEffect, useRef } from 'react'
// import { Map } from 'mapbox-gl'
// import { initMap } from './test'

// export const useMaps = (container: React.RefObject<HTMLDivElement>) => {
//   const mapInitRef = useRef<Map | null>(null)

//   useEffect(() => {
//     if (container.current) {
//       mapInitRef.current = initMap(
//         container.current,
//         [-100.31019063199852, 25.66901932031443]
//       )
//     }
//   }, [container])
// }
