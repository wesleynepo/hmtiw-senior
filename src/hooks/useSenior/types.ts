export type WorkingHours = {
  hours: string
  minutes: string
  open: boolean
}

export type DailyData = {
  timestamps: string
  totalHours: WorkingHours
  date: number
}
