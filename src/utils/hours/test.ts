import { timeSpent } from '.'

describe('hours', () => {
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return empty hours and minutes when empty events ', () => {
    expect(timeSpent([])).toEqual({ hours: 0, minutes: 0, open: false })
  })

  it('should calculate the time between two dates correctly', () => {
    const dates = [
      new Date('2022-05-08T04:15:00.000Z'),
      new Date('2022-05-08T05:25:00.000Z')
    ]

    expect(timeSpent(dates)).toEqual({ hours: 1, minutes: 10, open: false })
  })

  it('should calculate when one event and consider open', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2022-05-08T05:25:00.000Z'))

    const dates = [new Date('2022-05-08T04:15:00.000Z')]

    expect(timeSpent(dates)).toEqual({ hours: 1, minutes: 10, open: true })
  })
})
