export type WorkingHours = {
  hours: string
  minutes: string
  open: boolean
}

export type DailyData = {
  totalHours: WorkingHours
  day: number
  events: ClockingEvent[]
}

export type ClockingEvent = {
  date: Date
  latitude?: number
  longitude?: number
}
