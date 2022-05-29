import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { MonthEventTable } from '../components/MonthEventTable'
import { useSeniorContext } from '../hooks/useSenior'

export const History = () => {
  const { monthlyReport } = useSeniorContext()
  const date = new Date()

  return (
    <Tabs>
      <TabList>
        {monthlyReport.map((_, index) => {
          date.setMonth(index)
          return (
            <Tab key={index}>
              {date.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
            </Tab>
          )
        })}
      </TabList>
      <TabPanels>
        {monthlyReport.map((month, index) => {
          return (
            <TabPanel key={index}>
              <MonthEventTable data={month} />
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
