import { ClockingEvent } from '../../../hooks/useSenior/types'
import { ClockingEventByActiveUserQueryResponse } from '../dtos/clocking-event-by-active-user-query'

export const mapClockingEventByActiveUserQuery = (
  data: ClockingEventByActiveUserQueryResponse
): ClockingEvent[] => {
  return data.result.map((clocking) => ({
    date: new Date(clocking.dateEvent + 'T' + clocking.timeEvent),
    latitude: clocking.geolocation?.latitude,
    longitude: clocking.geolocation?.longitude
  }))
}
