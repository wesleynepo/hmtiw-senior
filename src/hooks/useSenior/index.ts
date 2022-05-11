import { AxiosError } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { SeniorContext } from '../../contexts/SeniorContext'
import { clockingEventByActiveUserQuery } from '../../services/senior'
import {
  getTokenCookie,
  removeTokenCookie,
  setTokenCookie
} from '../../utils/token'
import { useNotify } from '../useNotify'
import { timeSpent } from '../../utils/hours'

export const useSeniorContext = () => useContext(SeniorContext)!

export const useSenior = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [clockingEvents, setClockingEvents] = useState<Date[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const { requestWarning, tokenError } = useNotify()

  const loadClockingEvents = async () => {
    setLoading(true)
    const data = await clockingEventByActiveUserQuery(token)

    if (data instanceof AxiosError) {
      setLoading(false)
      if (data.response?.status === 401) {
        setToken('')
        removeTokenCookie()
        return tokenError()
      }
      return requestWarning()
    }

    setClockingEvents(data.sort())
    setLoading(false)
  }

  const todayWorkingHours = timeSpent(
    clockingEvents.filter(
      (date) => date.toDateString() === new Date().toDateString()
    ),
    currentDate
  )

  const monthlyReport = () => {
    const today = new Date()
    const days: Date[][] = Array.from(Array(today.getDate())).map(
      () => new Array(0)
    )

    const dates = clockingEvents.filter(
      (date) => date.getMonth() === today.getMonth()
    )

    dates.forEach((date) => {
      days[date.getDate() - 1].push(date)
    })

    return days.map((day, index) => {
      const timestamps = day
        .map((date) => date.toLocaleTimeString('en-GB'))

      return {
        timestamps,
        totalHours: timeSpent(day),
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

    if (token) setToken(token)
  }, [])

  useEffect(() => {
    if (token) loadClockingEvents()
  }, [token])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const { open, hours, minutes } = todayWorkingHours

    if (open) {
      document.title = `HMTIW Senior (${hours}:${minutes})`
    }
  }, [todayWorkingHours, currentDate])

  return {
    token,
    setToken,
    clockingEvents,
    todayWorkingHours,
    monthlyReport,
    saveToken,
    loading
  }
}
