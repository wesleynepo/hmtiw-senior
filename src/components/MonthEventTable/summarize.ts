import { WorkingHours } from '../../hooks/useSenior/types'
import { twoDigits } from '../../utils/format'

export const expectedHoursPerDay = 8
export const minutesPerHour = 60
export const minutesTolerance = 10

export type DaySummary = {
  differenceLabel: string
  differenceMinutes: number
  color: string
}

const isWeekend = (year: number, month: number, day: number) =>
  [0, 6].includes(new Date(year, month, day).getDay())

const formatMinutesDifference = (minutes: number) => {
  const signal = minutes < 0 ? '-' : '+'
  const absoluteMinutes = Math.abs(minutes)

  return `${signal}${Math.floor(absoluteMinutes / minutesPerHour)}:${twoDigits(
    absoluteMinutes % minutesPerHour
  )}`
}

export const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const absoluteMinutes = Math.abs(totalMinutes)

  return `${Math.floor(absoluteMinutes / minutesPerHour)}:${twoDigits(
    absoluteMinutes % minutesPerHour
  )}`
}

export const summarizeDay = (
  year: number,
  month: number,
  day: number,
  { hours, minutes, open }: WorkingHours
): DaySummary => {
  if (open) {
    return { differenceLabel: '', differenceMinutes: 0, color: 'red.400' }
  }

  const workedMinutes = Number(hours) * minutesPerHour + Number(minutes)

  if (workedMinutes === 0) {
    return { differenceLabel: 'Folga', differenceMinutes: 0, color: 'blue.400' }
  }

  if (isWeekend(year, month, day)) {
    return {
      differenceLabel: `${hours}:${minutes} (Extra)`,
      differenceMinutes: workedMinutes,
      color: 'green.300'
    }
  }

  const difference = workedMinutes - expectedHoursPerDay * minutesPerHour

  if (Math.abs(difference) <= minutesTolerance) {
    return { differenceLabel: '0', differenceMinutes: 0, color: 'blue.400' }
  }

  return {
    differenceLabel: formatMinutesDifference(difference),
    differenceMinutes: difference,
    color: difference < 0 ? 'red.400' : 'green.400'
  }
}
