import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { SeniorContext } from "../contexts/SeniorContext"
import { clockingEventByActiveUserQuery } from "../services/senior"

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

    const todayWorkingHours = (): string => {
        if (clockingEvents.length > 1) {
            const day = new Date();
        
            const todayEvents = clockingEvents.map(date => new Date(date)).sort().filter(date => date.toDateString() === day.toDateString())
            
            if (todayEvents.length % 2 !== 0) {
                todayEvents.push(day)
            }

            let elapsedTime = 0
            
            for (let i = 0; i < todayEvents.length; i = i + 2) {
                elapsedTime += ((todayEvents[i+1].getTime() - todayEvents[i].getTime()) / 1000)
            }
            
            
            const hours = elapsedTime/ 60 / 60
            const minutes = (hours % 1) * 60
    
            return `${Math.round(hours)}:${Math.round(minutes)}`
        }

        return 'No data'
    }  


    useEffect(() => {
        if (token) {
            loadClockingEvents()
        }
    }, [token])

    return {
        token,
        setToken,
        clockingEvents,
        todayWorkingHours
    }
}
