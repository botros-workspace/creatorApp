import { Map } from 'mapbox-gl'
import { MAPBOX_API_KEY } from '../constants/apiKeys'
export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10',
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: MAPBOX_API_KEY,
    doubleClickZoom: false,
  })
}
