import { twoDigits } from '../format'

const isOdd = (value: number) => value % 2 !== 0

export const timeSpent = (events: Date[], currentDate?: Date) => {
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
