import { ClockingEventByActiveUserQueryResponse } from '../dtos/clocking-event-by-active-user-query'

export const mapClockingEventByActiveUserQuery = (
  data: ClockingEventByActiveUserQueryResponse
) => {
  return data.result.map(
    (clocking) => new Date(clocking.dateEvent + 'T' + clocking.timeEvent)
  )
}
