import { summarizeDay } from './summarize'

// 2022-05: dia 2 = segunda, dia 7 = sábado
const workDay = (hours: string, minutes: string, open = false) =>
  summarizeDay(2022, 4, 2, { hours, minutes, open })

describe('summarizeDay', () => {
  it('marca dia aberto sem diferença', () => {
    expect(workDay('05', '00', true)).toEqual({
      differenceLabel: '',
      differenceMinutes: 0,
      color: 'red.400'
    })
  })

  it('marca folga quando não há registros', () => {
    expect(workDay('00', '00').differenceLabel).toBe('Folga')
  })

  it('zera a diferença dentro da tolerância de 10 minutos', () => {
    expect(workDay('08', '10').differenceMinutes).toBe(0)
    expect(workDay('07', '50').differenceMinutes).toBe(0)
  })

  it('calcula débito e crédito fora da tolerância', () => {
    expect(workDay('07', '15')).toMatchObject({
      differenceLabel: '-0:45',
      differenceMinutes: -45,
      color: 'red.400'
    })
    expect(workDay('09', '30')).toMatchObject({
      differenceLabel: '+1:30',
      differenceMinutes: 90,
      color: 'green.400'
    })
  })

  it('conta fim de semana inteiro como extra', () => {
    expect(
      summarizeDay(2022, 4, 7, { hours: '03', minutes: '20', open: false })
    ).toMatchObject({
      differenceLabel: '03:20 (Extra)',
      differenceMinutes: 200
    })
  })
})
