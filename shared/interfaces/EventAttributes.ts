import { EventCategories } from '../enums/event-categories.enum'

export interface EventAttributes {
  title: string
  eventImages: { name: string; image: File }[]
  eventStartDateTime: string
  eventEndDateTime: string
  eventDuration: string
  lat: number
  long: number
  primary_category: EventCategories
  other_categories: EventCategories[]
  selectedAddress: string | undefined
  teaser: string
  description: string
  phone_number: string
  website: string
  weather_dependent: string
  averagePrices: number[]
  avergaeAge: number[]
  averagePassive: number[]
  averageContemplative: number[]
  attendeLimit: number
  isIndoor: boolean
  isOutdoor: boolean
  isPreparedForRain: boolean
}
