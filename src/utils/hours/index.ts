import { WorkingHours } from '../../hooks/useSenior/types'
import { twoDigits } from '../format'

const isOdd = (value: number) => value % 2 !== 0

export const timeSpent = (events: Date[], currentDate?: Date): WorkingHours => {
  const open = isOdd(events.length)

  if (events.length === 0) {
    return { hours: twoDigits(0), minutes: twoDigits(0), open }
  }

  if (open) events.push(currentDate ?? new Date())

  let time = 0

  for (let i = 0; i < events.length; i = i + 2) {
    time += (events[i + 1].getTime() - events[i].getTime()) / 1000
  }

  const hours = time / 3600
  const minutes = (hours % 1) * 60

  return {
    hours: twoDigits(Math.floor(hours)),
    minutes: twoDigits(Math.floor(minutes)),
    open
  }
}

export const monthEventsGroup = (clockingEvents: Date[]) => {
  const today = new Date()
  const days = Array.from({ length: 12 }, () =>
    Array.from({ length: 31 }, () => new Array(0))
  )

  const dates = clockingEvents.filter(
    (date) => date.getFullYear() === today.getFullYear()
  )

  dates.forEach((date) => {
    days[date.getMonth()][date.getDate() - 1].push(date)
  })

  return days.map((month) => {
    return month.map((day, index) => {
      const timestamps = day
        .map((date) => date.toLocaleTimeString('en-GB'))
        .join('  ')

      return {
        timestamps,
        totalHours: timeSpent(day),
        date: index + 1
      }
    })
  })
}
