import { MonthEventTable } from '.'
import { render, screen } from '@testing-library/react'
import { useBreakpointValue } from '@chakra-ui/react'

const mockedUseBreakpointValue = useBreakpointValue as jest.Mock<boolean>

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

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react')

  return {
    ...originalModule,
    useBreakpointValue: jest.fn()
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
    mockedUseBreakpointValue.mockReturnValue(false)

    const { container } = render(<MonthEventTable />)

    expect(
      container
        .querySelector('table div.chakra-stack__divider')
        ?.hasAttribute('hidden')
    ).toBeFalsy()
  })

  it('should show dividers on mobile screen', () => {
    mockedUseBreakpointValue.mockReturnValue(true)

    const { container } = render(<MonthEventTable />)

    expect(
      container
        .querySelector('table div.chakra-stack__divider')
        ?.hasAttribute('hidden')
    ).toBeTruthy()
  })
})
