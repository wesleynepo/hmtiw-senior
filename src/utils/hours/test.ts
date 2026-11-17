import { timeSpent } from '.'

describe('hours', () => {
  it('should return empty hours and minutes when empty events ', () => {
    expect(timeSpent([])).toEqual({ hours: '00', minutes: '00', open: false })
  })

  it('should calculate the time between two dates correctly', () => {
    const dates = [
      new Date('2022-05-08T04:15:00.000Z'),
      new Date('2022-05-08T05:25:00.000Z')
    ]

    expect(timeSpent(dates)).toEqual({
      hours: '01',
      minutes: '10',
      open: false
    })
  })

  it('should calculate when one event and consider open', () => {
    const dates = [new Date('2022-05-08T04:15:00.000Z')]

    expect(timeSpent(dates, new Date('2022-05-08T05:25:00.000Z'))).toEqual({
      hours: '01',
      minutes: '10',
      open: true
    })
  })

  it('should not mutate the events it receives', () => {
    const dates = [new Date('2022-05-08T04:15:00.000Z')]
    timeSpent(dates, new Date('2022-05-08T05:25:00.000Z'))

    expect(dates).toHaveLength(1)
  })
})
