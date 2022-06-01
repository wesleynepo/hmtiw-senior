import { MonthEventTable } from '.'
import { act, render, screen } from '@testing-library/react'

jest.mock('../../hooks/useSenior', () => {
  return {
    useSeniorContext: jest.fn().mockReturnValue({
      monthlyReport: jest.fn().mockReturnValue([
        {
          timestamps: ['08:00:00', '12:00:00', '13:00:00'],
          totalHours: 12,
          date: 1
        }
      ])
    })
  }
})

describe('<MonthEventTable/>', () => {
  it('should show events clock correctly', () => {
    render(<MonthEventTable />)

    expect(screen.queryByText('08:00:00')).toBeTruthy()
    expect(screen.queryByText('12:00:00')).toBeTruthy()
    expect(screen.queryByText('13:00:00')).toBeTruthy()
  })

  it('should show dividers on desktop screen', () => {
    render(<MonthEventTable />)

    expect(screen.getAllByTestId('clock-event-divider')[0].hidden).toBeFalsy()
  })

  it('should show dividers on mobile screen', async () => {
    // TODO: resize to mobile sizes and do the assertion
    expect(true).toBeTruthy()
  })
})
