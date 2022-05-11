import { MonthEventTable } from '.'
import { render, screen } from '@testing-library/react'

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

  // it('should show dividers on desktop screen', () => {
  //   jest.mock('@chakra-ui/react', () => {
  //     const originalModule = jest.requireActual('@chakra-ui/react')

  //     return {
  //       ...originalModule,
  //       useBreakpointValue: false
  //     }
  //   })

  //   const { container } = render(<MonthEventTable />)

  //   expect(
  //     container.getElementsByClassName('chakra-stack__divider').length
  //   ).toBeGreaterThan(1)
  // })

  // it('should show dividers on mobile screen', () => {
  //   jest.mock('@chakra-ui/react', () => {
  //     const originalModule = jest.requireActual('@chakra-ui/react')

  //     return {
  //       ...originalModule,
  //       useBreakpointValue: true
  //     }
  //   })

  //   const { container } = render(<MonthEventTable />)

  //   expect(
  //     container.getElementsByClassName('chakra-stack__divider').filter(element => element.).length
  //   ).toHaveProperty('hidden')
  // })
})
