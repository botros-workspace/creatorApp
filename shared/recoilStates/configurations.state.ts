import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { ConfigurationsAttributes } from '../interfaces/ConfigurationsAttributes'

const { persistAtom } = recoilPersist()
const initialConfigurationsState = {
  showNavbar: true,
  newEventLocationProvided: false,
}
export const configurationsState = atom<ConfigurationsAttributes>({
  key: 'configurations',
  default: initialConfigurationsState,
  effects_UNSTABLE: [persistAtom],
})
