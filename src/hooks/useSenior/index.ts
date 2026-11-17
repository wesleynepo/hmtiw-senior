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
import { monthEventsGroup, timeSpent } from '../../utils/hours'
import { ClockingEvent, DailyData } from './types'
import { login } from '../../services/senior/login'
import { AuthCredentialRequest } from '../../services/senior/dtos/auth-data'

export const useSeniorContext = () => useContext(SeniorContext)!

export const useSenior = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [year, setYear] = useState(new Date().getFullYear())
  const [clockingEvents, setClockingEvents] = useState<ClockingEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(getTokenCookie() ?? '')
  const { requestWarning, tokenError, authenticationError } = useNotify()

  const loadClockingEvents = async (silent = false) => {
    if (!silent) setLoading(true)
    const data = await clockingEventByActiveUserQuery(token)
    setLoading(false)

    if (data instanceof Error) {
      if (data instanceof AxiosError && data.response?.status === 401) {
        setToken('')
        removeTokenCookie()
        return tokenError()
      }
      return requestWarning()
    }

    setClockingEvents(data.sort((a, b) => a.date.getTime() - b.date.getTime()))
  }

  const authenticate = async (data: AuthCredentialRequest) => {
    const token = await login(data)
    if (token instanceof Error) return authenticationError()
    saveToken(token)
  }

  const todayClockingEvents = clockingEvents.filter(
    ({ date }) => date.toDateString() === new Date().toDateString()
  )

  const todayWorkingHours = timeSpent(
    todayClockingEvents.map(({ date }) => date),
    currentDate
  )

  const monthlyReport: DailyData[][] = monthEventsGroup(clockingEvents, year)

  const todayEvents = todayClockingEvents
    .map(({ date }) => date.toLocaleTimeString('en-GB'))
    .join('  ')

  const saveToken = (token: string) => {
    setToken(token)
    setTokenCookie(token)
  }

  const logout = () => {
    setToken('')
    setClockingEvents([])
    removeTokenCookie()
  }

  useEffect(() => {
    if (token) loadClockingEvents()
  }, [token])

  // recarrega as batidas ao voltar para a aba: a marcação acontece no app da Senior
  useEffect(() => {
    if (!token) return

    const refresh = () =>
      document.visibilityState === 'visible' && loadClockingEvents(true)

    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
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
    authenticate,
    setToken,
    clockingEvents,
    todayClockingEvents,
    todayWorkingHours,
    todayEvents,
    monthlyReport,
    saveToken,
    logout,
    loading,
    year,
    setYear
  }
}
