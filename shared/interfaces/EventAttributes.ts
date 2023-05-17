import { EventCategories } from '../enums/event-categories.enum'

export interface EventAttributes {
  title: string
  eventImage: File | undefined
  eventStartDateTime: string
  eventEndDateTime: string
  eventDuration: string
  lat: number
  long: number
  primary_category: EventCategories
  other_categories: EventCategories[]
  selectedAddress: string
  teaser: string
  description: string
  phone_number: string
  website: string
  weather_dependent: string
}
