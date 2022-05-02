import { AxiosError } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { SeniorContext } from '../../contexts/SeniorContext'
import { clockingEventByActiveUserQuery } from '../../services/senior'
import { getTokenCookie, setTokenCookie } from '../../utils/token'
import { WorkingHours } from './types'

export const useSeniorContext = () => useContext(SeniorContext)!

export const useSenior = () => {
  const [token, setToken] = useState('')
  const [clockingEvents, setClockingEvents] = useState<string[]>([])
  const loadClockingEvents = async () => {
    const clockingEvents = await clockingEventByActiveUserQuery(token)

    if (clockingEvents instanceof AxiosError) {
      return
    }

    setClockingEvents(clockingEvents)
  }

  const timefy = (events: Date[], day: Date) => {
    let open = false

    if (events.length === 0) {
      return { hours: 0, minutes: 0, open }
    }

    if (events.length % 2 !== 0) {
      open = true
      events.push(day)
    }

    let elapsedTime = 0

    for (let i = 0; i < events.length; i = i + 2) {
      elapsedTime += (events[i + 1].getTime() - events[i].getTime()) / 1000
    }

    const hours = elapsedTime / 60 / 60
    const minutes = (hours % 1) * 60

    return { hours: Math.floor(hours), minutes: Math.round(minutes), open }
  }

  const todayWorkingHours = (): WorkingHours => {
    const day = new Date()

    const todayEvents = clockingEvents
      .map((date) => new Date(date))
      .sort()
      .filter((date) => date.toDateString() === day.toDateString())

    return timefy(todayEvents, day)
  }

  const monthlyReport = () => {
    const today = new Date()
    const days: Date[][] = Array.from(Array(today.getDate())).map(
      () => new Array(0)
    )

    const dates = clockingEvents
      .map((date) => new Date(date))
      .sort()
      .filter((date) => date.getMonth() === today.getMonth())

    dates.forEach((date) => {
      days[date.getDate() - 1].push(date)
    })

    return days.map((day, index) => {
      const timestamps = day
        .map((date) => date.toLocaleTimeString('en-GB'))
        .join('  ')

      return {
        timestamps,
        totalHours: timefy(day, new Date()),
        date: index + 1
      }
    })
  }

  const saveToken = (token: string) => {
    setToken(token)
    setTokenCookie(token)
  }

  useEffect(() => {
    const token = getTokenCookie()

    if (token) {
      setToken(token)
    }
  })

  useEffect(() => {
    if (token) {
      loadClockingEvents()
    }
  }, [token])

  return {
    token,
    setToken,
    clockingEvents,
    todayWorkingHours,
    monthlyReport,
    saveToken
  }
}
