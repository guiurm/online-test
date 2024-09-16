import type CarrouselSubscriber from './CarrouselSubscriber'

export const CARROUSEL_ACTIONS = 'carrousel.actions'

export type TCarrouselCardInjection = (data: { id: string; subscriber: CarrouselSubscriber }) => void
export type TCarrouselProvideCard = TCarrouselCardInjection
export type TCarrouselItems = { id: string }[]
