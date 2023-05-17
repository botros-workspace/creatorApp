import { atom } from 'recoil'
import { EventAttributes } from '../interfaces/EventAttributes'
import { recoilPersist } from 'recoil-persist'
import { EventCategories } from '../enums/event-categories.enum'

const { persistAtom } = recoilPersist()
export const initialEventState: EventAttributes = {
  title: '',
  eventEndDateTime: '',
  eventStartDateTime: '',
  eventDuration: '',
  eventImage: undefined,
  lat: 0,
  long: 0,
  primary_category: EventCategories.UNDEFINED_CATEGORY,
  other_categories: [],
  selectedAddress: '',
  teaser: '',
  description: '',
  phone_number: '',
  website: '',
  weather_dependent: '',
}
export const newEventState = atom<EventAttributes>({
  key: 'newEvent',
  default: initialEventState,
  effects_UNSTABLE: [persistAtom],
})
