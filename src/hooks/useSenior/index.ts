import { AxiosError } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { SeniorContext } from '../../contexts/SeniorContext'
import { clockingEventByActiveUserQuery } from '../../services/senior'
import {
  getTokenCookie,
  removeTokenCookie,
  setTokenCookie
} from '../../utils/token'
import { WorkingHours } from './types'
import { useNotify } from '../useNotify'
import { timeSpent } from '../../utils/hours'

export const useSeniorContext = () => useContext(SeniorContext)!

export const useSenior = () => {
  const [clockingEvents, setClockingEvents] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const { requestWarning, tokenError } = useNotify()

  const loadClockingEvents = async () => {
    setLoading(true)
    const data = await clockingEventByActiveUserQuery(token)
    setLoading(false)

    if (data instanceof AxiosError) {
      if (data.response?.status === 401) {
        setToken('')
        removeTokenCookie()
        return tokenError()
      }
      return requestWarning()
    }

    setClockingEvents(data)
  }

  const todayWorkingHours = (): WorkingHours => {
    const day = new Date()

    const todayEvents = clockingEvents
      .map((date) => new Date(date))
      .sort()
      .filter((date) => date.toDateString() === day.toDateString())

    return timeSpent(todayEvents)
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
    saveToken,
    loading
  }
}
