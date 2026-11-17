import { ClockingEvent, WorkingHours } from '../../hooks/useSenior/types'
import { twoDigits } from '../format'

const isOdd = (value: number) => value % 2 !== 0

export const timeSpent = (events: Date[], currentDate?: Date): WorkingHours => {
  const open = isOdd(events.length)

  if (events.length === 0) {
    return { hours: twoDigits(0), minutes: twoDigits(0), open }
  }

  const pairs = open ? [...events, currentDate ?? new Date()] : events

  let time = 0

  for (let i = 0; i < pairs.length; i = i + 2) {
    time += (pairs[i + 1].getTime() - pairs[i].getTime()) / 1000
  }

  const hours = time / 3600
  const minutes = (hours % 1) * 60

  return {
    hours: twoDigits(Math.floor(hours)),
    minutes: twoDigits(Math.floor(minutes)),
    open
  }
}

export const monthEventsGroup = (
  clockingEvents: ClockingEvent[],
  year: number
) => {
  const days = Array.from({ length: 12 }, () =>
    Array.from({ length: 31 }, (): ClockingEvent[] => [])
  )

  clockingEvents
    .filter(({ date }) => date.getFullYear() === year)
    .forEach((event) => {
      days[event.date.getMonth()][event.date.getDate() - 1].push(event)
    })

  return days.map((month) => {
    return month.map((events, index) => {
      return {
        totalHours: timeSpent(events.map(({ date }) => date)),
        day: index + 1,
        events
      }
    })
  })
}
