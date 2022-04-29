import { ClockingEventByActiveUserQueryResponse } from "../dtos/clocking-event-by-active-user-query"

export const mapClockingEventByActiveUserQuery = (data: ClockingEventByActiveUserQueryResponse): string[] => {
    return data.result.map(clocking => clocking.createdAt)
}