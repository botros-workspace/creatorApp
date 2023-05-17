import { Map } from 'mapbox-gl'
import { MAPBOX_API_KEY } from '../constants/apiKeys'

export const mapInstance = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: MAPBOX_API_KEY,
    doubleClickZoom: true,
  })
}
